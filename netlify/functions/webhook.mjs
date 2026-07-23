// ============================================================
// Receptor de webhooks da nonStop.
// URL: https://SEU-SITE.netlify.app/.netlify/functions/webhook?secret=SEU_SEGREDO
//
// Além de manter a base (store "imoveis"), registra cada mudança
// num log de eventos (store "eventos") para o email diário:
//   entrou / saiu / atualizou (com o que mudou, de -> para)
// ============================================================
import { getStore } from "@netlify/blobs";
import { normalize } from "./_shared.mjs";

const brl = (v) => (v == null ? "—" : "R$ " + Math.round(v).toLocaleString("pt-BR"));
const FIELDS = [
  ["valorVenda", "Preço", brl],
  ["status", "Status", (v) => v || "—"],
  ["area", "Área", (v) => (v == null ? "—" : Math.round(v) + " m²")],
  ["quartos", "Quartos", (v) => (v == null ? "—" : String(v))],
  ["vagas", "Vagas", (v) => (v == null ? "—" : String(v))],
  ["suites", "Suítes", (v) => (v == null ? "—" : String(v))],
  ["cond", "Condomínio", brl],
  ["endereco", "Endereço", (v) => v || "—"],
];
function diff(oldR, newR) {
  const ch = [];
  for (const [k, label, fmt] of FIELDS) {
    const a = oldR ? oldR[k] ?? null : null;
    const b = newR ? newR[k] ?? null : null;
    if (a !== b) ch.push({ campo: label, de: fmt(a), para: fmt(b) });
  }
  return ch;
}
function info(rec) {
  return rec ? { id: rec.id, bairro: rec.bairro, endereco: rec.endereco, tipoG: rec.tipoG,
    preco: rec.valorVenda, statusImovel: rec.status, link: rec.link, foto: rec.foto } : {};
}

// O e-mail diário deve refletir só o recorte do gaiaestates.com.br (mesmos
// pisos usados lá: SITE_MIN_VALUE e SITE_MIN_PRICE_PER_SQM), não o universo
// completo do usesquare. A base "imoveis" (usada por outras análises) segue
// guardando tudo — só o log de eventos que vira email é filtrado aqui.
function passesGaiaFloor(rec) {
  if (!rec) return false;
  const minVal = Number(process.env.SITE_MIN_VALUE);
  if (Number.isFinite(minVal) && !(rec.valorVenda >= minVal)) return false;
  const minPPS = Number(process.env.SITE_MIN_PRICE_PER_SQM);
  if (Number.isFinite(minPPS)) {
    if (!rec.area || rec.valorVenda == null) return false;
    if (!(rec.valorVenda / rec.area >= minPPS)) return false;
  }
  return true;
}

export default async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  let body;
  try { body = await req.json(); } catch { body = {}; }

  const url = new URL(req.url);
  const auth = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const candidates = [
    url.searchParams.get("secret"), url.searchParams.get("token"),
    req.headers.get("x-webhook-secret"), req.headers.get("x-webhook-token"),
    auth, body && (body.token || body.secret),
  ].filter(Boolean);
  const SECRET = process.env.WEBHOOK_SECRET;
  if (!SECRET || !candidates.includes(SECRET)) return new Response("Unauthorized", { status: 401 });

  const store = getStore("imoveis");
  const eventos = getStore("eventos");
  const logEvent = async (ev) => {
    try {
      const key = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      await eventos.setJSON(key, { ...ev, at: new Date().toISOString() });
    } catch (_) {}
  };
  const event = body.event;

  try {
    if (event === "property:delete" || event === "publication:delete") {
      const id = body.propertyId;
      let old = null;
      if (id) { old = await store.get(id, { type: "json" }).catch(() => null); await store.delete(id); }
      if (passesGaiaFloor(old)) await logEvent({ tipo: "saiu", ...info(old), id: id || (old && old.id) });
      return Response.json({ ok: true, event, deleted: id });
    }

    const rec = normalize(body.property);
    if (!rec || !rec.id) return new Response("No property id", { status: 400 });
    const old = await store.get(rec.id, { type: "json" }).catch(() => null);
    await store.setJSON(rec.id, rec);

    if (event === "publication:create" || !old) {
      if (passesGaiaFloor(rec)) await logEvent({ tipo: "entrou", ...info(rec) });
    } else if (event === "property:update") {
      const changes = diff(old, rec);
      if (changes.length && passesGaiaFloor(rec)) await logEvent({ tipo: "atualizou", ...info(rec), changes });
    }
    return Response.json({ ok: true, event, saved: rec.id });
  } catch (e) {
    return new Response("Error: " + e.message, { status: 500 });
  }
};
