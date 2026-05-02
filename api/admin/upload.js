const { getSupabaseConfig } = require("../_lib/supabase");

function isAuthorized(req) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    throw new Error("Missing required environment variable: ADMIN_PASSWORD");
  }
  return req.headers["x-admin-password"] === adminPassword;
}

function generateFilename(originalName) {
  const timestamp = Date.now();
  const sanitized = originalName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.-]/g, "-")
    .toLowerCase();
  return `${timestamp}-${sanitized}`;
}

module.exports = async (req, res) => {
  try {
    if (!isAuthorized(req)) {
      res.status(401).json({ error: "Senha de administrador invalida." });
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const { filename, contentType, base64 } = req.body || {};

    if (!filename || !base64) {
      res.status(400).json({ error: "Nome do arquivo e conteudo base64 sao obrigatorios." });
      return;
    }

    const { url, serviceRoleKey, bucket } = getSupabaseConfig();

    if (!serviceRoleKey) {
      res.status(500).json({ error: "SUPABASE_SERVICE_ROLE_KEY nao configurada." });
      return;
    }

    const buffer = Buffer.from(base64, "base64");
    const path = generateFilename(filename);

    const uploadResponse = await fetch(`${url}/storage/v1/object/${bucket}/${path}`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": contentType || "application/octet-stream",
        "x-upsert": "true",
      },
      body: buffer,
    });

    if (!uploadResponse.ok) {
      const text = await uploadResponse.text();
      throw new Error(`Upload failed (${uploadResponse.status}): ${text}`);
    }

    const publicUrl = `${url}/storage/v1/object/public/${bucket}/${path}`;

    res.status(200).json({
      url: publicUrl,
      path,
    });
  } catch (error) {
    res.status(500).json({
      error: "Nao foi possivel fazer o upload.",
      details: error.message,
    });
  }
};
