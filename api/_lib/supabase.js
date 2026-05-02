const DAY_ORDER = ["Segunda", "Terca", "Terça", "Quarta", "Quinta", "Sexta", "Sabado", "Sábado", "Domingo"];

function getEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getSupabaseConfig() {
  const url = normalizeSupabaseUrl(getEnv("SUPABASE_URL"));
  const anonKey = getEnv("SUPABASE_ANON_KEY");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || null;

  return {
    url,
    anonKey,
    serviceRoleKey,
    bucket: process.env.SUPABASE_BUCKET || "marmitas",
  };
}

function normalizeSupabaseUrl(url) {
  return url.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
}

async function supabaseRequest(path, { method = "GET", body, useServiceRole = false } = {}) {
  const { url, anonKey, serviceRoleKey } = getSupabaseConfig();
  const apiKey = useServiceRole && serviceRoleKey ? serviceRoleKey : anonKey;

  const response = await fetch(`${url}${path}`, {
    method,
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Supabase request failed (${response.status}): ${text}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function compareDays(a, b) {
  return DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b);
}

module.exports = {
  compareDays,
  DAY_ORDER,
  getSupabaseConfig,
  supabaseRequest,
};
