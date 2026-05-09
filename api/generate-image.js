const https = require("https");

function setCorsHeaders(res) {
  const origin = res.req.headers.origin || "*";
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");
}

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const options = {
      method: "GET",
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      headers: { Accept: "image/*" },
    };

    const req = https.request(options, (res) => {
      if (res.statusCode >= 400) {
        reject({ status: res.statusCode, message: `Pollinations retornou erro ${res.statusCode}` });
        return;
      }

      const contentType = res.headers["content-type"] || "image/jpeg";
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const buffer = Buffer.concat(chunks);
        const base64 = buffer.toString("base64");
        resolve({ data_url: `data:${contentType};base64,${base64}`, size_kb: Math.round(buffer.length / 1024), content_type: contentType });
      });
    });

    req.on("error", (err) => reject({ status: 500, message: err.message }));
    req.setTimeout(60000, () => {
      req.destroy();
      reject({ status: 504, message: "Timeout ao gerar imagem. A API pode estar lenta." });
    });
    req.end();
  });
}

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt, model, width, height } = req.body || {};

  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({ error: "O campo 'prompt' é obrigatório" });
  }

  try {
    const w = width || 1024;
    const h = height || 768;
    const m = model || "flux";
    const encodedPrompt = encodeURIComponent(prompt.trim());
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${w}&height=${h}&model=${m}&nologo=true`;

    const result = await downloadImage(url);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(err.status || 500).json({
      error: err.message || "Erro ao gerar imagem",
    });
  }
}
