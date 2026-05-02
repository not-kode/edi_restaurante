const { compareDays, supabaseRequest } = require("./_lib/supabase");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const rows = await supabaseRequest(
      "/rest/v1/marmitas?select=*&ativo=eq.true&order=ordem.asc.nullslast,created_at.asc"
    );

    const sortedRows = rows.sort((left, right) => {
      const dayDifference = compareDays(left.dia_semana, right.dia_semana);

      if (dayDifference !== 0) return dayDifference;
      if (left.destaque_dia !== right.destaque_dia) return Number(right.destaque_dia) - Number(left.destaque_dia);
      if (left.promocao !== right.promocao) return Number(right.promocao) - Number(left.promocao);

      return (left.ordem || 0) - (right.ordem || 0);
    });

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    res.status(200).json({
      items: sortedRows,
    });
  } catch (error) {
    res.status(500).json({
      error: "Nao foi possivel carregar o cardapio.",
      details: error.message,
    });
  }
};
