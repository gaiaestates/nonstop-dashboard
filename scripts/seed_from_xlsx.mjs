// ============================================================
// Carga inicial: lê a planilha exportada da nonStop e envia os
// imóveis para a função /seed do seu site Netlify (uma única vez).
//
// PRÉ-REQUISITOS (na sua máquina):
//   npm install xlsx
//
// USO:
//   node scripts/seed_from_xlsx.mjs ./imoveis.xlsx https://SEU-SITE.netlify.app SEU_WEBHOOK_SECRET
//
// Depois disso, os webhooks mantêm a base viva sozinhos.
// ============================================================
import xlsx from "xlsx";

const [, , file, siteUrl, secret] = process.argv;
if (!file || !siteUrl || !secret) {
  console.error("\nUso: node scripts/seed_from_xlsx.mjs <planilha.xlsx> <https://site.netlify.app> <WEBHOOK_SECRET>\n");
  process.exit(1);
}

const num = (v) => { if (v === null || v === undefined || v === "" || v === "-") return null; const n = Number(v); return Number.isFinite(n) ? n : null; };
const clean = (v) => (v === null || v === undefined ? "" : String(v).trim());
const splitFeats = (v) => clean(v).split("|").map((x) => x.trim()).filter((x) => x && x !== "-");

function tipoGrp(t) {
  t = clean(t).toUpperCase();
  if (t.includes("APARTAMENTO") || t === "FLAT") return "Apartamento";
  if (t.includes("STUDIO") || t.includes("LOFT") || t.includes("KITNET")) return "Studio/Kitnet";
  if (t.includes("COBERTURA") || t.includes("DUPLEX") || t.includes("TRIPLEX")) return "Cobertura/Duplex";
  if (t.includes("CASA") || t.includes("SOBRADO")) return "Casa/Sobrado";
  if (t.includes("CONJUNTO") || t.includes("LAJE") || t.includes("LAGE") || t.includes("LOJA") || t.includes("GALPAO") || t.includes("COMERCIAL") || t.includes("EDIFICIO")) return "Comercial";
  if (t.includes("TERRENO")) return "Terreno";
  return "Outro";
}
const STATUS_MAP = { SEM_OBSERVACOES: "Disponível", VENDIDO: "Vendido", EM_NEGOCIACAO: "Em negociação" };

// mapeia uma linha da planilha -> registro normalizado (mesmo shape do _shared.normalize)
function rowToRecord(r) {
  const id = clean(r["Código"]) || null;
  const slug = clean(r["Slug Gestor"]);
  const link = clean(r["Link nonstop"]) || (slug && id ? `https://www.usenonstop.com/imoveis/${slug}/${id}` : "");
  return {
    id,
    bairro: clean(r["Bairro"]),
    cidade: clean(r["Cidade"]),
    tipoRaw: clean(r["Tipo"]),
    tipoG: tipoGrp(r["Tipo"]),
    status: STATUS_MAP[clean(r["Status"])] || null,
    valorVenda: num(r["Valor venda"]),
    area: num(r["Área privativa"]),
    quartos: num(r["Quartos"]),
    vagas: num(r["Vagas"]),
    suites: num(r["Suítes"]),
    banheiros: num(r["Banheiros"]),
    cond: num(r["Valor condomínio"]),
    endereco: clean(r["Endereço"]) + (clean(r["Número"]) && clean(r["Número"]) !== "-" ? ", " + clean(r["Número"]) : ""),
    gestor: clean(r["Nome Gestor"]),
    link,
    desc: clean(r["Descrição"]).slice(0, 160),
    feats: splitFeats(r["Características"]),
    condoFeats: splitFeats(r["Características condomínio"]),
    createdAt: r["Data de criação"] || null,
  };
}

const wb = xlsx.readFile(file);
const ws = wb.Sheets[wb.SheetNames[0]];
const rows = xlsx.utils.sheet_to_json(ws, { defval: "" });
const records = rows.map(rowToRecord).filter((r) => r.id);
console.log(`Lidos ${records.length} imóveis da planilha.`);

const endpoint = `${siteUrl.replace(/\/$/, "")}/.netlify/functions/seed?secret=${encodeURIComponent(secret)}`;
const BATCH = 300;
let sent = 0;
for (let i = 0; i < records.length; i += BATCH) {
  const chunk = records.slice(i, i + BATCH);
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ records: chunk }),
  });
  const j = await res.json().catch(() => ({}));
  if (!res.ok) { console.error("Erro no lote:", res.status, j); process.exit(1); }
  sent += j.saved || 0;
  console.log(`Lote ${i / BATCH + 1}: +${j.saved} (total ${sent})`);
}
console.log(`\n✅ Seed concluído: ${sent} imóveis enviados. A partir de agora os webhooks mantêm tudo atualizado.`);
