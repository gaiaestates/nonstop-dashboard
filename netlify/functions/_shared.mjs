// ============================================================
// Lógica compartilhada: normalização + análise (com benchmark ITBI)
// Usada pela função webhook (grava) e pela função data (agrega)
// ============================================================
import BENCH from "./_itbi_bench.mjs";

export const CITY = "São Paulo";

// ---------- helpers ----------
const num = (v) => {
  if (v === null || v === undefined || v === "" || v === "-") return null;
  const n = Number(v); return Number.isFinite(n) ? n : null;
};
const clean = (v) => (v === null || v === undefined ? "" : String(v));
const stripAccents = (s) => clean(s).normalize("NFKD").replace(/[̀-ͯ]/g, "");
const normB = (s) => stripAccents(s).toLowerCase().trim();
const pretty = (s) => { s = clean(s).toLowerCase().replace(/_/g, " "); return s.charAt(0).toUpperCase() + s.slice(1); };
const benchM2 = (bairro) => { const b = BENCH.bairros[normB(bairro)]; return b ? b.rs_m2_util : null; };

export function tipoGrp(t) {
  t = clean(t).toUpperCase();
  if (t.includes("APARTAMENTO") || t === "FLAT") return "Apartamento";
  if (t.includes("STUDIO") || t.includes("LOFT") || t.includes("KITNET")) return "Studio/Kitnet";
  if (t.includes("COBERTURA") || t.includes("DUPLEX") || t.includes("TRIPLEX")) return "Cobertura/Duplex";
  if (t.includes("CASA") || t.includes("SOBRADO")) return "Casa/Sobrado";
  if (t.includes("CONJUNTO") || t.includes("LAJE") || t.includes("LAGE") || t.includes("LOJA") ||
      t.includes("GALPAO") || t.includes("COMERCIAL") || t.includes("EDIFICIO")) return "Comercial";
  if (t.includes("TERRENO")) return "Terreno";
  return "Outro";
}
const STATUS_MAP = { SEM_OBSERVACOES: "Disponível", VENDIDO: "Vendido", EM_NEGOCIACAO: "Em negociação" };

// ---------- normalização (aceita Property do webhook ou registro do seed) ----------
export function normalize(p) {
  if (!p) return null;
  const addr = p.address || {}, values = p.values || {}, areas = p.areas || {}, user = p.user || {};
  let vagas = Array.isArray(p.parkingLots) ? p.parkingLots.length : num(p.parkingLots);
  const base36Id = p.base36Id || p.id || null;
  const slug = user.slug || p.userSlug || "";
  const link = p.url || (slug && base36Id ? `https://www.usenonstop.com/imoveis/${slug}/${base36Id}` : "");
  const feats = Array.isArray(p.features) ? p.features : (p.features ? [p.features] : []);
  const condoFeats = p.condo && Array.isArray(p.condo.features) ? p.condo.features : [];
  const foto = (p.media && Array.isArray(p.media.images) && p.media.images[0] && p.media.images[0].url) || p.image || null;
  return {
    id: base36Id, bairro: clean(addr.area), cidade: clean(addr.city),
    tipoRaw: clean(p.type), tipoG: tipoGrp(p.type),
    status: STATUS_MAP[p.transactionStatus] || null,
    valorVenda: num(values.sale), area: num(areas.useful ?? areas.private),
    quartos: num(p.rooms), vagas, suites: num(p.suites), banheiros: num(p.baths),
    cond: num(values.condoFee),
    endereco: clean(addr.street) + (clean(addr.number) && clean(addr.number) !== "-" ? ", " + clean(addr.number) : ""),
    gestor: clean(user.name), link, desc: clean(p.description).slice(0, 160),
    feats, condoFeats, foto, createdAt: p.createdAt || null,
  };
}

// ---------- estatística ----------
const median = (a) => { a = a.filter((x) => x != null).sort((x, y) => x - y); if (!a.length) return null; const m = Math.floor(a.length / 2); return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2; };
const quantile = (a, q) => { a = a.filter((x) => x != null).sort((x, y) => x - y); if (!a.length) return null; const pos = (a.length - 1) * q, b = Math.floor(pos), r = pos - b; return a[b + 1] !== undefined ? a[b] + r * (a[b + 1] - a[b]) : a[b]; };
const mode = (a) => { const c = {}; a.filter((x) => x != null).forEach((x) => (c[x] = (c[x] || 0) + 1)); let bt = null, bn = -1; for (const k in c) if (c[k] > bn) { bn = c[k]; bt = Number(k); } return bt; };
const BINS = [0, 5e5, 7.5e5, 1e6, 1.5e6, 2e6, 3e6, 1e18];
const LABS = ["Até 500k", "500–750k", "750k–1M", "1–1,5M", "1,5–2M", "2–3M", "3M+"];
const faixaOf = (p) => { if (p == null) return null; for (let i = 0; i < LABS.length; i++) if (p >= BINS[i] && p < BINS[i + 1]) return LABS[i]; return null; };
function countFeats(records, key) { const c = {}; records.forEach((r) => (r[key] || []).forEach((f) => (c[f] = (c[f] || 0) + 1))); return c; }
function searchsorted(arr, x) { let lo = 0, hi = arr.length; while (lo < hi) { const mid = (lo + hi) >> 1; if (arr[mid] < x) lo = mid + 1; else hi = mid; } return lo; }

export function analyze(allRecords) {
  const df = allRecords.filter((r) => r && r.cidade === CITY);
  const vend = df.filter((r) => r.status === "Vendido");
  const disp = df.filter((r) => r.status === "Disponível");
  const neg = df.filter((r) => r.status === "Em negociação");
  const m2 = (r) => (r.valorVenda != null && r.area ? r.valorVenda / r.area : null);

  const kpis = {
    total: df.length, disponivel: disp.length, vendido: vend.length, negociacao: neg.length,
    ticket_medio_vendido: median(vend.map((r) => r.valorVenda)),
    ticket_medio_disp: median(disp.map((r) => r.valorVenda)),
    m2_vendido: Math.round(median(vend.map(m2)) || 0),
    itbi_m2: BENCH.rs_m2_util_global, k_global: BENCH.K_global,
  };

  // bairros
  const byB = {};
  df.forEach((r) => { const b = r.bairro || "—"; (byB[b] = byB[b] || { Disponível: 0, Vendido: 0, "Em negociação": 0, vv: [] }); if (r.status) byB[b][r.status]++; if (r.status === "Vendido" && r.valorVenda != null) byB[b].vv.push(r.valorVenda); });
  let bairros = Object.entries(byB).map(([b, o]) => {
    const v = o.Vendido, d = o.Disponível, total = v + d + o["Em negociação"];
    const st = v + d > 0 ? (v / (v + d)) * 100 : null;
    return { bairro: b, vendido: v, disponivel: d, negociacao: o["Em negociação"], total,
      sell_through: st != null ? Math.round(st * 10) / 10 : null,
      ticket: o.vv.length ? Math.round(median(o.vv)) : null, itbi_m2: benchM2(b) };
  }).filter((x) => x.total >= 15).sort((a, b) => b.vendido - a.vendido);

  // tipos
  const byT = {};
  df.forEach((r) => { (byT[r.tipoG] = byT[r.tipoG] || { Disponível: 0, Vendido: 0, "Em negociação": 0 }); if (r.status) byT[r.tipoG][r.status]++; });
  const tipos = Object.entries(byT).map(([t, o]) => ({ tipo: t, vendido: o.Vendido, disponivel: o.Disponível, negociacao: o["Em negociação"], total: o.Vendido + o.Disponível + o["Em negociação"] })).sort((a, b) => b.total - a.total);

  // faixas
  const fx = {}; LABS.forEach((l) => (fx[l] = { Vendido: 0, Disponível: 0 }));
  df.forEach((r) => { const l = faixaOf(r.valorVenda); if (l && r.status && fx[l][r.status] != null) fx[l][r.status]++; });
  const faixas = LABS.map((l) => ({ faixa: l, vendido: fx[l].Vendido, disponivel: fx[l].Disponível }));

  const cq = {}, cv = {};
  vend.forEach((r) => { if (r.quartos != null && r.quartos <= 5) cq[r.quartos] = (cq[r.quartos] || 0) + 1; if (r.vagas != null && r.vagas <= 5) cv[r.vagas] = (cv[r.vagas] || 0) + 1; });
  const quartos = Object.keys(cq).map((q) => ({ q: +q, vendido: cq[q] })).sort((a, b) => a.q - b.q);
  const vagas = Object.keys(cv).map((v) => ({ v: +v, vendido: cv[v] })).sort((a, b) => a.v - b.v);
  const oportunidades = bairros.filter((b) => b.disponivel > 0).slice(0, 15);
  const catalogo = disp.map((r) => ({ end: r.endereco, bairro: r.bairro, tipo: r.tipoG, preco: r.valorVenda, area: r.area, q: r.quartos, vg: r.vagas, gestor: r.gestor, link: r.link, desc: r.desc }));

  // ---------- captar / anunciar ----------
  const maxVend = Math.max(...bairros.map((b) => b.vendido), 1);
  let captar_bairros = bairros.filter((b) => b.total >= 30).map((b) => {
    const ratio = b.vendido > 0 ? b.disponivel / b.vendido : 99;
    return { bairro: b.bairro, vendido: b.vendido, disponivel: b.disponivel, sell: b.sell_through, ratio: Math.round(ratio * 100) / 100, ticket: b.ticket,
      score: Math.round((0.45 * (b.vendido / maxVend) + 0.35 * (1 / (1 + ratio)) + 0.20 * ((b.sell_through || 0) / 100)) * 100) };
  }).sort((a, b) => b.score - a.score).slice(0, 18);
  const captar_tipos = tipos.filter((t) => t.total >= 40).map((t) => { const ratio = t.vendido > 0 ? t.disponivel / t.vendido : 99; return { tipo: t.tipo, vendido: t.vendido, disponivel: t.disponivel, sell: Math.round((t.vendido / (t.vendido + t.disponivel)) * 1000) / 10, ratio: Math.round(ratio * 100) / 100 }; }).sort((a, b) => b.vendido - a.vendido);
  const segSold = {}, segVals = {}, segDisp = {};
  vend.forEach((r) => { const k = r.bairro + "||" + r.tipoG; segSold[k] = (segSold[k] || 0) + 1; (segVals[k] = segVals[k] || []).push(r.valorVenda); });
  const segMed = {}; Object.keys(segVals).forEach((k) => (segMed[k] = median(segVals[k])));
  disp.forEach((r) => { const k = r.bairro + "||" + r.tipoG; segDisp[k] = (segDisp[k] || 0) + 1; });
  let anunciar = Object.keys(segDisp).map((k) => { const [b, t] = k.split("||"); const sold = segSold[k] || 0; return { bairro: b, tipo: t, disponivel: segDisp[k], vendido_seg: sold, ticket: segMed[k] != null ? Math.round(segMed[k]) : null }; }).filter((x) => x.vendido_seg >= 15).sort((a, b) => b.vendido_seg - a.vendido_seg).slice(0, 20);

  // ---------- lead score com preço de mercado (ITBI) ----------
  const sellByB = {}; bairros.forEach((b) => (sellByB[b.bairro] = b.sell_through || 0));
  const maxSeg = Math.max(...Object.values(segSold), 1);
  const vendFaixa = {}; LABS.forEach((l) => (vendFaixa[l] = 0));
  vend.forEach((r) => { const l = faixaOf(r.valorVenda); if (l) vendFaixa[l]++; });
  const maxFx = Math.max(...Object.values(vendFaixa), 1);
  // distribuição de ratios (para percentil)
  const ratios = [];
  disp.forEach((r) => { const bench = benchM2(r.bairro); if (r.area >= 15 && r.area <= 2000 && r.valorVenda >= 50000 && r.valorVenda <= 5e7 && bench) { const lm2 = r.valorVenda / r.area; if (lm2 >= 2000 && lm2 <= 60000) ratios.push(lm2 / bench); } });
  ratios.sort((a, b) => a - b);
  const leads = disp.map((r) => {
    const k = r.bairro + "||" + r.tipoG;
    const dem = (segSold[k] || 0) / maxSeg, stv = (sellByB[r.bairro] || 0) / 100;
    let fxs = 0.5; if (r.valorVenda != null) { const l = faixaOf(r.valorVenda); if (l) fxs = vendFaixa[l] / maxFx; }
    const bench = benchM2(r.bairro);
    const lm2 = (r.valorVenda != null && r.area) ? r.valorVenda / r.area : null;
    let price = 0.4, vsm = null, showLm2 = null, mercado = null;
    if (lm2 && bench && lm2 >= 2000 && lm2 <= 60000) {
      const ratio = lm2 / bench; const pct = ratios.length ? searchsorted(ratios, ratio) / ratios.length : null;
      if (pct != null) price = 1 - pct;
      vsm = Math.round((ratio - 1) * 100); showLm2 = Math.round(lm2); mercado = bench;
    } else if (lm2 && lm2 >= 2000 && lm2 <= 60000) showLm2 = Math.round(lm2);
    const score = Math.round((0.38 * dem + 0.20 * stv + 0.30 * price + 0.12 * fxs) * 100);
    const reasons = []; const seg = segSold[k] || 0;
    if (seg >= 100) reasons.push("segmento muito vendido"); else if (seg >= 40) reasons.push("segmento com boa demanda");
    if ((sellByB[r.bairro] || 0) >= 55) reasons.push("bairro escoa rápido");
    if (vsm != null) { if (vsm <= -10) reasons.push(Math.abs(vsm) + "% abaixo do mercado"); else if (vsm >= 25) reasons.push(vsm + "% acima do mercado"); }
    return { end: r.endereco, bairro: r.bairro, tipo: r.tipoG, preco: r.valorVenda, area: r.area, q: r.quartos, vg: r.vagas, gestor: r.gestor, link: r.link, desc: r.desc, score, motivos: reasons.length ? reasons.join(", ") : "—", lm2: showLm2, mercado, vsm };
  }).sort((a, b) => b.score - a.score);

  // ---------- PERFIL ----------
  const ns = vend.length, na = disp.length;
  const liftOf = (cs, ca, minN) => Object.keys(cs).filter((kk) => cs[kk] >= minN && (ca[kk] || 0) > 0).map((kk) => { const ps = cs[kk] / ns, pa = (ca[kk] || 0) / na; return { f: pretty(kk), sold: Math.round(ps * 100), avail: Math.round(pa * 100), lift: Math.round((ps / pa) * 100) / 100 }; }).sort((a, b) => b.lift - a.lift).slice(0, 12);
  const lift_unit = liftOf(countFeats(vend, "feats"), countFeats(disp, "feats"), 300);
  const lift_condo = liftOf(countFeats(vend, "condoFeats"), countFeats(disp, "condoFeats"), 300);
  const areaBands = [[0, 45, "até 45"], [45, 70, "45–70"], [70, 100, "70–100"], [100, 150, "100–150"], [150, 250, "150–250"], [250, 1e9, "250+"]];
  const area_by_tipo = {};
  ["Apartamento", "Casa/Sobrado", "Studio/Kitnet", "Cobertura/Duplex"].forEach((t) => { const sub = vend.filter((r) => r.tipoG === t); area_by_tipo[t] = areaBands.map(([lo, hi]) => sub.filter((r) => r.area != null && r.area >= lo && r.area < hi).length); });
  const featlist = (sub, key, topn) => { const c = countFeats(sub, key), n = sub.length; return Object.entries(c).sort((a, b) => b[1] - a[1]).slice(0, topn).map(([k, v]) => ({ f: pretty(k), pct: Math.round((v / n) * 100) })); };
  const soldByB = {}; vend.forEach((r) => (soldByB[r.bairro] = (soldByB[r.bairro] || 0) + 1));
  const bairros_list = Object.keys(soldByB).filter((b) => soldByB[b] >= 25).sort((a, b) => soldByB[b] - soldByB[a]);
  const perfil_bairro = {};
  bairros_list.forEach((b) => {
    const sb = vend.filter((r) => r.bairro === b); const tc = {}; sb.forEach((r) => (tc[r.tipoG] = (tc[r.tipoG] || 0) + 1));
    perfil_bairro[b] = { n: sb.length, area_med: Math.round(median(sb.map((r) => r.area)) || 0) || null,
      area_p25: Math.round(quantile(sb.map((r) => r.area), 0.25) || 0) || null, area_p75: Math.round(quantile(sb.map((r) => r.area), 0.75) || 0) || null,
      ticket: Math.round(median(sb.map((r) => r.valorVenda)) || 0) || null, quartos: mode(sb.map((r) => r.quartos)), vagas: mode(sb.map((r) => r.vagas)), suites: mode(sb.map((r) => r.suites)),
      tipo: Object.entries(tc).sort((a, b) => b[1] - a[1])[0]?.[0] || null, feats: featlist(sb, "feats", 8), condo: featlist(sb, "condoFeats", 6), itbi_m2: benchM2(b) };
  });

  return {
    DATA: { kpis, bairros, tipos, faixas, quartos, vagas, oportunidades, catalogo },
    EXT: { captar_bairros, captar_tipos, anunciar, leads },
    PERFIL: { lift_unit, lift_condo, area_labels: areaBands.map((a) => a[2]), area_by_tipo, perfil_bairro, bairros_list },
    meta: { generatedAt: new Date().toISOString(), records: df.length },
  };
}
