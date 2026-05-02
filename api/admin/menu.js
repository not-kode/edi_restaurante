const { supabaseRequest } = require("../_lib/supabase");

function isAuthorized(req) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    throw new Error("Missing required environment variable: ADMIN_PASSWORD");
  }

  return req.headers["x-admin-password"] === adminPassword;
}

module.exports = async (req, res) => {
  try {
    if (!isAuthorized(req)) {
      res.status(401).json({ error: "Senha de administrador invalida." });
      return;
    }

    if (req.method === "GET") {
      const rows = await supabaseRequest(
        "/rest/v1/marmitas?select=*&order=dia_semana.asc,ordem.asc.nullslast,created_at.asc",
        { useServiceRole: true }
      );

      res.status(200).json({ items: rows });
      return;
    }

    if (req.method === "POST") {
      const payload = sanitizePayload(req.body || {});

      if (!payload.nome || !payload.dia_semana || payload.preco == null) {
        res.status(400).json({ error: "Nome, dia da semana e preco sao obrigatorios." });
        return;
      }

      const isUpdate = Boolean(payload.id);
      const path = isUpdate
        ? `/rest/v1/marmitas?id=eq.${encodeURIComponent(payload.id)}`
        : "/rest/v1/marmitas";
      const method = isUpdate ? "PATCH" : "POST";

      const response = await supabaseRequest(path, {
        method,
        body: omitId(payload),
        useServiceRole: true,
      });

      res.status(200).json({ item: Array.isArray(response) ? response[0] : response });
      return;
    }

    if (req.method === "DELETE") {
      const { id } = req.query;

      if (!id) {
        res.status(400).json({ error: "ID obrigatorio para exclusao." });
        return;
      }

      await supabaseRequest(`/rest/v1/marmitas?id=eq.${encodeURIComponent(id)}`, {
        method: "DELETE",
        useServiceRole: true,
      });

      res.status(200).json({ success: true });
      return;
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    res.status(500).json({
      error: "Nao foi possivel processar a solicitacao do admin.",
      details: error.message,
    });
  }
};

function sanitizePayload(payload) {
  return {
    id: payload.id || null,
    nome: `${payload.nome || ""}`.trim(),
    descricao: `${payload.descricao || ""}`.trim(),
    preco: payload.preco === "" || payload.preco == null ? null : Number(payload.preco),
    preco_promocional:
      payload.preco_promocional === "" || payload.preco_promocional == null
        ? null
        : Number(payload.preco_promocional),
    foto_url: `${payload.foto_url || ""}`.trim() || null,
    promocao: Boolean(payload.promocao),
    destaque_dia: Boolean(payload.destaque_dia),
    ativo: payload.ativo !== false,
    dia_semana: `${payload.dia_semana || ""}`.trim(),
    ordem: payload.ordem === "" || payload.ordem == null ? 0 : Number(payload.ordem),
  };
}

function omitId(payload) {
  const clone = { ...payload };
  delete clone.id;
  return clone;
}
