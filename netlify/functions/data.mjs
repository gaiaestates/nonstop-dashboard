// ============================================================
// Agrega todos os imóveis guardados e devolve o JSON do dashboard.
// URL: /.netlify/functions/data   (ou /api/data via redirect)
// Protegido por senha de leitura: header x-access-key === ACCESS_KEY
//   (o dashboard pede a senha uma vez e guarda na sessão)
// ============================================================
import { getStore } from "@netlify/blobs";
import { analyze } from "./_shared.mjs";

export default async (req) => {
  // senha de leitura (acesso restrito)
  const key = req.headers.get("x-access-key") || new URL(req.url).searchParams.get("key");
  if (process.env.ACCESS_KEY && key !== process.env.ACCESS_KEY) {
    return new Response("Unauthorized", { status: 401 });
  }

  const store = getStore("imoveis");
  const { blobs } = await store.list();
  const records = [];
  // busca em paralelo, em lotes, para não estourar limites
  const B = 100;
  for (let i = 0; i < blobs.length; i += B) {
    const slice = blobs.slice(i, i + B);
    const got = await Promise.all(slice.map((b) => store.get(b.key, { type: "json" }).catch(() => null)));
    got.forEach((r) => r && records.push(r));
  }

  const out = analyze(records);
  return new Response(JSON.stringify(out), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      // cache leve: 10 min no CDN, revalida em background
      "cache-control": "public, max-age=0, s-maxage=600, stale-while-revalidate=300",
    },
  });
};
