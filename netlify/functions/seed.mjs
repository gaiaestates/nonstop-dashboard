// ============================================================
// Carga inicial da base (roda uma única vez com a planilha).
// Recebe { records: [ <registro normalizado>, ... ] } e grava tudo.
// Protegido por ?secret=... === WEBHOOK_SECRET.
// O script local scripts/seed_from_xlsx.mjs envia os lotes para cá.
// ============================================================
import { getStore } from "@netlify/blobs";

export default async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const secret = new URL(req.url).searchParams.get("secret") || req.headers.get("x-webhook-secret");
  if (!process.env.WEBHOOK_SECRET || secret !== process.env.WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }
  let body;
  try { body = await req.json(); } catch { return new Response("Bad JSON", { status: 400 }); }
  const recs = Array.isArray(body.records) ? body.records : [];
  const store = getStore("imoveis");
  let n = 0;
  for (const r of recs) {
    if (r && r.id) { await store.setJSON(r.id, r); n++; }
  }
  return Response.json({ ok: true, saved: n });
};
