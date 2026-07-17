// ============================================================
// Lógica compartilhada do email diário (helper, não é endpoint).
// Usada por digest.mjs (agendada) e send-digest.mjs (gatilho manual).
// ============================================================
import { getStore } from "@netlify/blobs";

const brl = (v) => (v == null ? "—" : "R$ " + Math.round(v).toLocaleString("pt-BR"));
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function itemRow(e, accent) {
  const titulo = esc([e.tipoG, e.bairro].filter(Boolean).join(" · ") || "Imóvel");
  const sub = [e.endereco, e.preco != null ? brl(e.preco) : null].filter(Boolean).map(esc).join(" · ");
  const changes = (e.changes || []).map(
    (c) => `<div style="font-size:13px;color:#5a6472;margin-top:3px">• <b style="color:#2a3444">${esc(c.campo)}:</b> ${esc(c.de)} <span style="color:${accent}">→</span> <b>${esc(c.para)}</b></div>`
  ).join("");
  const link = e.link ? `<a href="${esc(e.link)}" style="color:${accent};text-decoration:none;font-weight:600;font-size:13px">ver imóvel ↗</a>` : "";
  const thumb = e.foto
    ? `<td width="74" valign="top" style="padding:12px 0 12px 14px;border-bottom:1px solid #eef0f3"><img src="${esc(e.foto)}" width="60" height="60" style="width:60px;height:60px;object-fit:cover;border-radius:8px;display:block" alt=""></td>`
    : "";
  const pad = e.foto ? "12px 14px 12px 12px" : "12px 14px";
  return `<tr>${thumb}<td valign="top" style="padding:${pad};border-bottom:1px solid #eef0f3">
    <div style="font-size:15px;font-weight:700;color:#1b2a4a">${titulo}</div>
    ${sub ? `<div style="font-size:13px;color:#8a94a3;margin-top:2px">${sub}</div>` : ""}
    ${changes}
    ${link ? `<div style="margin-top:6px">${link}</div>` : ""}
  </td></tr>`;
}
function section(titulo, emoji, accent, itens) {
  if (!itens.length) return "";
  return `<div style="margin:22px 0 8px">
    <div style="font-size:14px;font-weight:700;color:${accent};text-transform:uppercase;letter-spacing:.4px">${emoji} ${titulo} (${itens.length})</div>
    <table width="100%" cellspacing="0" cellpadding="0" style="margin-top:8px;background:#fff;border:1px solid #eef0f3;border-radius:10px;overflow:hidden">
      ${itens.map((e) => itemRow(e, accent)).join("")}
    </table></div>`;
}
function buildHtml(ev, dataStr) {
  const entrou = ev.filter((e) => e.tipo === "entrou");
  const saiu = ev.filter((e) => e.tipo === "saiu");
  const atualizou = ev.filter((e) => e.tipo === "atualizou");
  const total = ev.length;
  const resumo = total
    ? `🟢 ${entrou.length} entraram &nbsp;·&nbsp; 🔴 ${saiu.length} saíram &nbsp;·&nbsp; 🟡 ${atualizou.length} atualizados`
    : "Sem movimentações nas últimas 24 horas.";
  const body = total
    ? section("Entraram", "🟢", "#3fb27f", entrou) +
      section("Atualizados", "🟡", "#e0a13f", atualizou) +
      section("Saíram", "🔴", "#e05a5a", saiu)
    : `<div style="text-align:center;color:#8a94a3;padding:30px 0;font-size:14px">Nenhuma mudança no seu site nas últimas 24 horas.</div>`;
  return `<!DOCTYPE html><html><body style="margin:0;background:#f4f6f9;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif">
    <div style="max-width:620px;margin:0 auto;padding:24px 16px">
      <div style="background:#1b2a4a;border-radius:12px 12px 0 0;padding:22px 24px">
        <div style="color:#fff;font-size:19px;font-weight:800">Movimentações do seu site</div>
        <div style="color:#aeb9d0;font-size:13px;margin-top:2px">nonStop · ${esc(dataStr)}</div>
      </div>
      <div style="background:#fff;border-radius:0 0 12px 12px;padding:20px 24px 28px;border:1px solid #eef0f3;border-top:none">
        <div style="font-size:15px;color:#2a3444;font-weight:600;padding:10px 0 4px">${resumo}</div>
        ${body}
        <div style="margin-top:26px;padding-top:14px;border-top:1px solid #eef0f3;font-size:12px;color:#9aa4b2">
          Resumo automático gerado a partir dos webhooks da nonStop. Reflete os imóveis do seu site.
        </div>
      </div>
    </div></body></html>`;
}

export async function buildAndSend() {
  const RESEND = process.env.RESEND_API_KEY;
  const TO = process.env.DIGEST_TO;
  const FROM = process.env.DIGEST_FROM || "Gaia Estates <onboarding@resend.dev>";
  if (!RESEND || !TO) return "Faltam RESEND_API_KEY ou DIGEST_TO nas variáveis do Netlify.";

  const eventos = getStore("eventos");
  const { blobs } = await eventos.list();
  const now = Date.now();
  const DAY = 24 * 3600 * 1000;
  const recent = [];
  for (let i = 0; i < blobs.length; i += 100) {
    const slice = blobs.slice(i, i + 100);
    const got = await Promise.all(slice.map((b) => eventos.get(b.key, { type: "json" }).then((v) => ({ key: b.key, v })).catch(() => null)));
    for (const r of got) {
      if (!r || !r.v || !r.v.at) continue;
      const age = now - new Date(r.v.at).getTime();
      if (age <= DAY) recent.push(r.v);
      else if (age > 8 * DAY) eventos.delete(r.key).catch(() => {});
    }
  }
  recent.sort((a, b) => new Date(a.at) - new Date(b.at));

  const dataStr = new Date(now - 3 * 3600 * 1000).toLocaleDateString("pt-BR");
  const nE = recent.filter((e) => e.tipo === "entrou").length;
  const nA = recent.filter((e) => e.tipo === "atualizou").length;
  const nS = recent.filter((e) => e.tipo === "saiu").length;
  const subj = recent.length ? `Seu site: ${nE} entraram, ${nA} atualizados, ${nS} saíram` : "Seu site: sem movimentações nas últimas 24h";
  const html = buildHtml(recent, dataStr);

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND}`, "content-type": "application/json" },
    body: JSON.stringify({ from: FROM, to: TO, subject: subj, html }),
  });
  const out = await r.text();
  return r.ok ? `Email enviado (${recent.length} eventos). ${out}` : `Erro Resend: ${out}`;
}
