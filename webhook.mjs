// ============================================================
// Receptor de webhooks da nonStop.
// URL: https://SEU-SITE.netlify.app/.netlify/functions/webhook?secret=SEU_SEGREDO
//
// Autenticação flexível: aceita o segredo/token em qualquer um destes lugares
// (a nonStop pode enviar de formas diferentes):
//   - query:   ?secret=...  ou  ?token=...
//   - header:  x-webhook-secret / x-webhook-token / authorization (Bearer)
//   - body:    { token: ... } ou { secret: ... }
// Todos comparados com a env WEBHOOK_SECRET.
// ============================================================
import { getStore } from "@netlify/blobs";
import { normalize } from "./_shared.mjs";

export default async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  // lê o corpo primeiro (para poder checar token no body também)
  let body;
  try { body = await req.json(); } catch { body = {}; }

  const url = new URL(req.url);
  const auth = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const candidates = [
    url.searchParams.get("secret"),
    url.searchParams.get("token"),
    req.headers.get("x-webhook-secret"),
    req.headers.get("x-webhook-token"),
    auth,
    body && (body.token || body.secret),
  ].filter(Boolean);

  const SECRET = process.env.WEBHOOK_SECRET;
  if (!SECRET || !candidates.includes(SECRET)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const store = getStore("imoveis");
  const event = body.event;
  try {
    if (event === "property:delete" || event === "publication:delete") {
      const id = body.propertyId;
      if (id) await store.delete(id);
      return Response.json({ ok: true, event, deleted: id });
    }
    const rec = normalize(body.property);
    if (!rec || !rec.id) return new Response("No property id", { status: 400 });
    await store.setJSON(rec.id, rec);
    return Response.json({ ok: true, event, saved: rec.id });
  } catch (e) {
    return new Response("Error: " + e.message, { status: 500 });
  }
};
