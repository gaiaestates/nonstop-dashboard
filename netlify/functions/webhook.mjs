// ============================================================
// Receptor de webhooks da nonStop.
// URL final:  https://SEU-SITE.netlify.app/.netlify/functions/webhook
// Eventos tratados:
//   publication:create , property:update  -> grava/atualiza o imóvel
//   publication:delete , property:delete   -> remove o imóvel
//
// Segurança: exige o parâmetro ?secret=... igual à env WEBHOOK_SECRET.
//   (Peça à nonStop para registrar a URL já com ?secret=SEU_SEGREDO)
// ============================================================
import { getStore } from "@netlify/blobs";
import { normalize } from "./_shared.mjs";

export default async (req) => {
  // valida método
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  // valida segredo
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret") || req.headers.get("x-webhook-secret");
  if (!process.env.WEBHOOK_SECRET || secret !== process.env.WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  let body;
  try { body = await req.json(); } catch { return new Response("Bad JSON", { status: 400 }); }

  const store = getStore("imoveis");
  const event = body.event;

  try {
    if (event === "property:delete" || event === "publication:delete") {
      const id = body.propertyId;
      if (id) await store.delete(id);
      return Response.json({ ok: true, event, deleted: id });
    }

    // create / update -> normaliza e grava (chave = base36Id)
    const prop = body.property;
    const rec = normalize(prop);
    if (!rec || !rec.id) return new Response("No property id", { status: 400 });
    await store.setJSON(rec.id, rec);
    return Response.json({ ok: true, event, saved: rec.id });
  } catch (e) {
    return new Response("Error: " + e.message, { status: 500 });
  }
};
