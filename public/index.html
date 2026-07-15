<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Análise de Mercado · nonStop · São Paulo</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
<style>
:root{--bg:#0f1115;--panel:#181b22;--panel2:#20242d;--line:#2a2f3a;--txt:#e9edf3;--mut:#9aa4b2;--accent:#e07a3f;--accent2:#f0a55f;--green:#3fb27f;--blue:#5b8def;--amber:#e0b23f;--red:#e05a5a;}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--txt);line-height:1.5}
a{color:var(--accent2);text-decoration:none}a:hover{text-decoration:underline}
.wrap{max-width:1320px;margin:0 auto;padding:24px 20px 60px}
header{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:12px;margin-bottom:20px;border-bottom:1px solid var(--line);padding-bottom:18px}
h1{font-size:22px;font-weight:700}h1 span{color:var(--accent)}
.sub{color:var(--mut);font-size:13px;margin-top:4px}
.tabs{display:flex;gap:6px;margin:18px 0 22px;flex-wrap:wrap}
.tab{padding:9px 18px;border-radius:8px;background:var(--panel);color:var(--mut);cursor:pointer;font-size:14px;font-weight:600;border:1px solid var(--line)}
.tab.active{background:var(--accent);color:#fff;border-color:var(--accent)}
.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-bottom:22px}
.kpi{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:14px 16px}
.kpi .v{font-size:23px;font-weight:700}.kpi .l{font-size:12px;color:var(--mut);margin-top:2px}
.kpi .v.green{color:var(--green)}.kpi .v.blue{color:var(--blue)}.kpi .v.amber{color:var(--amber)}.kpi .v.acc{color:var(--accent2)}
.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.card{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:16px}
.card.full{grid-column:1/-1}
.card h3{font-size:14px;font-weight:600;margin-bottom:14px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.card h3 small{color:var(--mut);font-weight:400;font-size:12px}
.chart-box{position:relative;height:300px}.chart-box.tall{height:420px}
table{width:100%;border-collapse:collapse;font-size:13px}
th,td{text-align:left;padding:8px 10px;border-bottom:1px solid var(--line)}
th{color:var(--mut);font-weight:600;font-size:12px;text-transform:uppercase;letter-spacing:.3px;cursor:pointer;user-select:none;position:sticky;top:0;background:var(--panel)}
th:hover{color:var(--txt)}td.num,th.num{text-align:right}tr:hover td{background:var(--panel2)}
.badge{display:inline-block;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:600}
.b-green{background:rgba(63,178,127,.15);color:var(--green)}.b-blue{background:rgba(91,141,239,.15);color:var(--blue)}.b-amber{background:rgba(224,178,63,.15);color:var(--amber)}.b-red{background:rgba(224,90,90,.15);color:var(--red)}
.filters{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px;align-items:center}
.filters select,.filters input{background:var(--panel2);color:var(--txt);border:1px solid var(--line);border-radius:8px;padding:9px 12px;font-size:13px;outline:none}
.filters input{min-width:200px}.count{color:var(--mut);font-size:13px;margin-left:auto}
.tablewrap{max-height:660px;overflow:auto;border:1px solid var(--line);border-radius:10px}
.hidden{display:none}
.note{background:var(--panel2);border-left:3px solid var(--accent);padding:12px 16px;border-radius:6px;font-size:13px;color:var(--mut);margin-bottom:20px}.note b{color:var(--txt)}
footer{margin-top:36px;color:var(--mut);font-size:12px;text-align:center;border-top:1px solid var(--line);padding-top:16px}
#gate{max-width:360px;margin:12vh auto;text-align:center}
#gate input{width:100%;padding:11px 14px;border-radius:8px;border:1px solid var(--line);background:var(--panel2);color:var(--txt);font-size:14px;margin:14px 0}
#gate button{width:100%;padding:11px;border-radius:8px;border:none;background:var(--accent);color:#fff;font-weight:600;font-size:14px;cursor:pointer}
#gateMsg{color:var(--red);font-size:13px;min-height:18px}
#loading{text-align:center;color:var(--mut);margin:14vh auto}
@media(max-width:820px){.grid{grid-template-columns:1fr}}
</style></head><body>

<div id="gate" class="hidden">
<h1>Análise de Mercado <span style="color:var(--accent)">nonStop</span></h1>
<p class="sub">Acesso restrito</p>
<input id="gateKey" type="password" placeholder="senha de acesso" autofocus>
<button id="gateBtn">Entrar</button><div id="gateMsg"></div></div>
<div id="loading">Carregando dados…</div>

<div class="wrap hidden" id="app">
<header><div><h1>Análise de Mercado <span>nonStop</span></h1>
<div class="sub">São Paulo · Capital — demanda, disponíveis e preço real de mercado (ITBI)</div></div>
<div class="sub" id="stamp"></div></header>
<div class="tabs">
<div class="tab active" data-tab="demanda">📊 Inteligência de Demanda</div>
<div class="tab" data-tab="catalogo">🏙️ Catálogo</div>
<div class="tab" data-tab="sugestoes">💡 Sugestões</div>
<div class="tab" data-tab="perfil">🧬 Perfil de Captação</div></div>

<section id="demanda">
<div class="kpis" id="kpis"></div>
<div class="note"><b>Preço real de mercado (ITBI):</b> cruzamos as transações da Prefeitura (2020–2026) com a base nonStop e convertemos <b>área construída → útil</b> (coeficiente por bairro). O <b>R$/m² útil</b> é a mediana do que <b>realmente foi transacionado</b>. Como o ITBI costuma ser subdeclarado, ele é um piso — anúncios abaixo dele são preço agressivo.</div>
<div class="grid">
<div class="card full"><h3>Top 15 bairros por vendas <small>demanda comprovada</small></h3><div class="chart-box tall"><canvas id="chBairros"></canvas></div></div>
<div class="card"><h3>Sell-through por bairro <small>% vendido / total (mín. 30)</small></h3><div class="chart-box tall"><canvas id="chSell"></canvas></div></div>
<div class="card"><h3>Demanda por tipo</h3><div class="chart-box tall"><canvas id="chTipos"></canvas></div></div>
<div class="card"><h3>Faixa de ticket</h3><div class="chart-box"><canvas id="chFaixas"></canvas></div></div>
<div class="card"><h3>Quartos &amp; vagas mais vendidos</h3><div class="chart-box"><canvas id="chQV"></canvas></div></div>
<div class="card full"><h3>🎯 Onde anunciar — demanda, estoque e preço de mercado <small>R$/m² útil do ITBI por bairro</small></h3>
<div class="tablewrap" style="max-height:none"><table id="tOpp"><thead><tr><th>Bairro</th><th class="num">Vendidos</th><th class="num">Disponíveis</th><th class="num">Sell-through</th><th class="num">Ticket mediano</th><th class="num">R$/m² útil (ITBI)</th></tr></thead><tbody></tbody></table></div></div>
</div></section>

<section id="catalogo" class="hidden">
<div class="filters">
<select id="fBairro"><option value="">Todos os bairros</option></select>
<select id="fTipo"><option value="">Todos os tipos</option></select>
<select id="fFaixa"><option value="">Qualquer preço</option><option value="0-500000">Até 500k</option><option value="500000-750000">500–750k</option><option value="750000-1000000">750k–1M</option><option value="1000000-1500000">1–1,5M</option><option value="1500000-2000000">1,5–2M</option><option value="2000000-3000000">2–3M</option><option value="3000000-9999999999">3M+</option></select>
<select id="fQuartos"><option value="">Quartos</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option></select>
<input id="fTexto" placeholder="Buscar endereço, gestor..."><span class="count" id="catCount"></span></div>
<div class="tablewrap"><table id="tCat"><thead><tr><th data-k="bairro">Bairro</th><th data-k="tipo">Tipo</th><th data-k="end">Endereço</th><th class="num" data-k="preco">Preço</th><th class="num" data-k="area">Área</th><th class="num" data-k="q">Qts</th><th class="num" data-k="vg">Vg</th><th data-k="gestor">Gestor</th><th>Link</th></tr></thead><tbody></tbody></table></div></section>

<section id="sugestoes" class="hidden">
<div class="note"><b>Captar</b> = onde buscar imóveis (demanda alta + estoque escasso). <b>Anunciar</b> = quais disponíveis priorizar. O <b>ranking de leads</b> usa o <b>preço real de mercado (ITBI)</b>: imóveis abaixo do R$/m² do bairro pontuam mais.</div>
<div class="grid">
<div class="card"><h3>🎣 Bairros para CAPTAR</h3><div class="tablewrap" style="max-height:420px"><table id="tCap"><thead><tr><th>Bairro</th><th class="num">Score</th><th class="num">Vend.</th><th class="num">Disp.</th><th class="num">Estoq/venda</th><th class="num">Ticket</th></tr></thead><tbody></tbody></table></div></div>
<div class="card"><h3>🎣 Tipos para CAPTAR</h3><div class="tablewrap" style="max-height:420px"><table id="tCapT"><thead><tr><th>Tipo</th><th class="num">Vend.</th><th class="num">Disp.</th><th class="num">Sell-through</th><th class="num">Estoq/venda</th></tr></thead><tbody></tbody></table></div></div>
<div class="card full"><h3>📣 Perfis para ANUNCIAR agora <small>segmentos de alta demanda com estoque</small></h3><div class="tablewrap" style="max-height:none"><table id="tAnun"><thead><tr><th>Bairro</th><th>Tipo</th><th class="num">Vendidos</th><th class="num">Disponíveis</th><th class="num">Ticket segmento</th></tr></thead><tbody></tbody></table></div></div>
<div class="card full"><h3>🔥 Ranking de disponíveis por chance de gerar leads <small>demanda + velocidade + preço vs mercado (ITBI) + faixa</small></h3>
<div class="filters"><select id="lBairro"><option value="">Todos os bairros</option></select><select id="lTipo"><option value="">Todos os tipos</option></select><label style="color:var(--mut);font-size:13px"><input type="checkbox" id="lAbaixo"> só abaixo do mercado</label><input id="lTexto" placeholder="Buscar..."><span class="count" id="leadCount"></span></div>
<div class="tablewrap"><table id="tLead"><thead><tr><th class="num">Score</th><th>Bairro</th><th>Tipo</th><th>Endereço</th><th class="num">Preço</th><th class="num">R$/m² anúncio</th><th class="num">R$/m² mercado</th><th class="num">vs mercado</th><th>Por que</th><th>Link</th></tr></thead><tbody></tbody></table></div></div>
</div></section>

<section id="perfil" class="hidden">
<div class="note"><b>Baseado nos vendidos.</b> O <b>lift</b> compara a frequência de uma característica entre vendidos vs. ofertados — acima de 1,0 sugere que ela ajuda a fechar.</div>
<div class="grid">
<div class="card full"><h3>📐 Metragem que mais vende <small>por tipo</small></h3><div class="chart-box tall"><canvas id="chArea"></canvas></div></div>
<div class="card"><h3>✨ Características do imóvel que puxam a venda</h3><div class="tablewrap" style="max-height:440px"><table id="tLift"><thead><tr><th>Característica</th><th class="num">% vend.</th><th class="num">% ofert.</th><th class="num">Lift</th></tr></thead><tbody></tbody></table></div></div>
<div class="card"><h3>🏢 Diferenciais de condomínio que puxam a venda</h3><div class="tablewrap" style="max-height:440px"><table id="tLift2"><thead><tr><th>Diferencial</th><th class="num">% vend.</th><th class="num">% ofert.</th><th class="num">Lift</th></tr></thead><tbody></tbody></table></div></div>
<div class="card full"><h3>🎯 Perfil-alvo de captação por bairro</h3><div class="filters"><select id="pBairro"></select></div><div id="perfilCard"></div></div>
</div></section>

<footer>Fonte: nonStop (usenonstop.com) + ITBI/Prefeitura de SP (2020–2026) · <span id="metaInfo"></span></footer>
</div>

<script>
let DATA,EXT,PERFIL;
const fmtBRL=v=>v==null?'—':'R$ '+Math.round(v).toLocaleString('pt-BR');
const fmtK=v=>v==null?'—':'R$ '+(v>=1e6?(v/1e6).toFixed(v>=1e7?0:1)+'M':(v/1e3).toFixed(0)+'k');
const $=id=>document.getElementById(id);
const C={acc:'#e07a3f',acc2:'#f0a55f',green:'#3fb27f',blue:'#5b8def',amber:'#e0b23f',red:'#e05a5a'};
const KEY='nonstop_access_key';
async function boot(){
  const k=sessionStorage.getItem(KEY);
  if(!k){ $('loading').classList.add('hidden'); $('gate').classList.remove('hidden'); return; }
  try{
    const r=await fetch('/api/data',{headers:{'x-access-key':k}});
    if(r.status===401){ sessionStorage.removeItem(KEY); $('loading').classList.add('hidden'); $('gate').classList.remove('hidden'); $('gateMsg').textContent='Senha incorreta.'; return; }
    const j=await r.json(); DATA=j.DATA; EXT=j.EXT; PERFIL=j.PERFIL;
    $('loading').classList.add('hidden'); $('app').classList.remove('hidden');
    $('metaInfo').textContent='Atualizado em '+new Date(j.meta.generatedAt).toLocaleString('pt-BR')+' · '+j.meta.records.toLocaleString('pt-BR')+' imóveis';
    render();
  }catch(e){ $('loading').textContent='Erro ao carregar: '+e.message; }
}
$('gateBtn').onclick=()=>{ const v=$('gateKey').value.trim(); if(!v)return; sessionStorage.setItem(KEY,v); $('gate').classList.add('hidden'); $('loading').classList.remove('hidden'); boot(); };
$('gateKey').addEventListener('keydown',e=>{if(e.key==='Enter')$('gateBtn').click();});

function render(){
Chart.defaults.color='#9aa4b2';Chart.defaults.font.family="-apple-system,Segoe UI,Roboto,sans-serif";Chart.defaults.borderColor='#2a2f3a';
const k=DATA.kpis;
$('stamp').textContent=k.total.toLocaleString('pt-BR')+' imóveis (SP)';
$('kpis').innerHTML=[['acc',k.total.toLocaleString('pt-BR'),'Imóveis (SP)'],['green',k.vendido.toLocaleString('pt-BR'),'Vendidos'],['blue',k.disponivel.toLocaleString('pt-BR'),'Disponíveis'],['amber',k.negociacao.toLocaleString('pt-BR'),'Em negociação'],['',fmtK(k.ticket_medio_vendido),'Ticket mediano vendido'],['acc2','R$ '+k.itbi_m2.toLocaleString('pt-BR'),'R$/m² útil mercado (ITBI)'],['','×'+k.k_global,'Construída ÷ útil (K global)']].map(([c,v,l])=>`<div class="kpi"><div class="v ${c}">${v}</div><div class="l">${l}</div></div>`).join('');
const SECTIONS=['demanda','catalogo','sugestoes','perfil'];
document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));t.classList.add('active');SECTIONS.forEach(s=>$(s).classList.toggle('hidden',t.dataset.tab!==s));});
const tb=DATA.bairros.slice(0,15);
new Chart(chBairros,{type:'bar',data:{labels:tb.map(b=>b.bairro),datasets:[{label:'Vendidos',data:tb.map(b=>b.vendido),backgroundColor:C.green},{label:'Disponíveis',data:tb.map(b=>b.disponivel),backgroundColor:C.blue}]},options:{indexAxis:'y',maintainAspectRatio:false,scales:{y:{ticks:{autoSkip:false}}},plugins:{legend:{position:'top'}}}});
const st=DATA.bairros.filter(b=>(b.vendido+b.disponivel)>=30&&b.sell_through!=null).sort((a,b)=>b.sell_through-a.sell_through).slice(0,15);
new Chart(chSell,{type:'bar',data:{labels:st.map(b=>b.bairro),datasets:[{label:'Sell-through %',data:st.map(b=>b.sell_through),backgroundColor:C.acc}]},options:{indexAxis:'y',maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{max:100,ticks:{callback:v=>v+'%'}},y:{ticks:{autoSkip:false}}}}});
const tp=DATA.tipos.filter(t=>t.vendido+t.disponivel>0);
new Chart(chTipos,{type:'bar',data:{labels:tp.map(t=>t.tipo),datasets:[{label:'Vendidos',data:tp.map(t=>t.vendido),backgroundColor:C.green},{label:'Disponíveis',data:tp.map(t=>t.disponivel),backgroundColor:C.blue},{label:'Em negociação',data:tp.map(t=>t.negociacao),backgroundColor:C.amber}]},options:{indexAxis:'y',maintainAspectRatio:false,scales:{x:{stacked:true},y:{stacked:true}},plugins:{legend:{position:'top'}}}});
new Chart(chFaixas,{type:'bar',data:{labels:DATA.faixas.map(f=>f.faixa),datasets:[{label:'Vendidos',data:DATA.faixas.map(f=>f.vendido),backgroundColor:C.green},{label:'Disponíveis',data:DATA.faixas.map(f=>f.disponivel),backgroundColor:C.blue}]},options:{maintainAspectRatio:false,plugins:{legend:{position:'top'}}}});
new Chart(chQV,{type:'bar',data:{labels:['1','2','3','4','5'],datasets:[{label:'Por quartos (vend.)',data:[1,2,3,4,5].map(n=>(DATA.quartos.find(x=>x.q===n)||{}).vendido||0),backgroundColor:C.acc},{label:'Por vagas (vend.)',data:[1,2,3,4,5].map(n=>(DATA.vagas.find(x=>x.v===n)||{}).vendido||0),backgroundColor:C.blue}]},options:{maintainAspectRatio:false,plugins:{legend:{position:'top'}}}});
document.querySelector('#tOpp tbody').innerHTML=DATA.oportunidades.map(b=>{const cls=b.sell_through>=55?'b-green':b.sell_through>=45?'b-amber':'b-blue';return `<tr><td><b>${b.bairro}</b></td><td class="num">${b.vendido}</td><td class="num">${b.disponivel}</td><td class="num"><span class="badge ${cls}">${b.sell_through!=null?b.sell_through+'%':'—'}</span></td><td class="num">${fmtBRL(b.ticket)}</td><td class="num">${b.itbi_m2?'R$ '+b.itbi_m2.toLocaleString('pt-BR'):'—'}</td></tr>`;}).join('');
const cat=DATA.catalogo,fB=$('fBairro'),fT=$('fTipo');
[...new Set(cat.map(c=>c.bairro).filter(Boolean))].sort().forEach(b=>fB.add(new Option(b,b)));
[...new Set(cat.map(c=>c.tipo).filter(Boolean))].sort().forEach(t=>fT.add(new Option(t,t)));
let sortK='preco',sortDir=-1;
function renderCat(){const bq=fB.value,tq=fT.value,fq=$('fFaixa').value,qq=+$('fQuartos').value||0,txt=$('fTexto').value.toLowerCase().trim();let[lo,hi]=fq?fq.split('-').map(Number):[0,Infinity];let rows=cat.filter(c=>(!bq||c.bairro===bq)&&(!tq||c.tipo===tq)&&(!fq||(c.preco!=null&&c.preco>=lo&&c.preco<=hi))&&(!qq||(c.q!=null&&c.q>=qq))&&(!txt||((c.end+' '+c.gestor+' '+c.desc).toLowerCase().includes(txt))));rows.sort((a,b)=>{let x=a[sortK],y=b[sortK];if(x==null)return 1;if(y==null)return -1;if(typeof x==='string')return sortDir*x.localeCompare(y);return sortDir*(x-y);});$('catCount').textContent=rows.length.toLocaleString('pt-BR')+' disponíveis';document.querySelector('#tCat tbody').innerHTML=rows.slice(0,600).map(c=>`<tr><td>${c.bairro}</td><td>${c.tipo}</td><td title="${(c.desc||'').replace(/"/g,'')}">${c.end}</td><td class="num">${fmtBRL(c.preco)}</td><td class="num">${c.area!=null?Math.round(c.area)+' m²':'—'}</td><td class="num">${c.q??'—'}</td><td class="num">${c.vg??'—'}</td><td>${c.gestor||'—'}</td><td>${c.link?`<a href="${c.link}" target="_blank">ver ↗</a>`:'—'}</td></tr>`).join('')+(rows.length>600?`<tr><td colspan="9" style="text-align:center;color:var(--mut)">Exibindo 600 de ${rows.length}.</td></tr>`:'');}
document.querySelectorAll('#tCat th[data-k]').forEach(th=>th.onclick=()=>{const key=th.dataset.k;if(sortK===key)sortDir*=-1;else{sortK=key;sortDir=key==='preco'||key==='area'?-1:1;}renderCat();});
['fBairro','fTipo','fFaixa','fQuartos','fTexto'].forEach(id=>$(id).addEventListener(id==='fTexto'?'input':'change',renderCat));renderCat();
const sb=s=>{const c=s>=70?'b-green':s>=45?'b-amber':'b-blue';return `<span class="badge ${c}">${s}</span>`;};
document.querySelector('#tCap tbody').innerHTML=EXT.captar_bairros.map(b=>`<tr><td><b>${b.bairro}</b></td><td class="num">${sb(b.score)}</td><td class="num">${b.vendido}</td><td class="num">${b.disponivel}</td><td class="num">${b.ratio.toFixed(2)}</td><td class="num">${fmtBRL(b.ticket)}</td></tr>`).join('');
document.querySelector('#tCapT tbody').innerHTML=EXT.captar_tipos.map(t=>`<tr><td><b>${t.tipo}</b></td><td class="num">${t.vendido}</td><td class="num">${t.disponivel}</td><td class="num">${t.sell}%</td><td class="num">${t.ratio.toFixed(2)}</td></tr>`).join('');
document.querySelector('#tAnun tbody').innerHTML=EXT.anunciar.map(a=>`<tr><td><b>${a.bairro}</b></td><td>${a.tipo}</td><td class="num">${a.vendido_seg}</td><td class="num">${a.disponivel}</td><td class="num">${fmtBRL(a.ticket)}</td></tr>`).join('');
const leads=EXT.leads,lB=$('lBairro'),lT=$('lTipo');
[...new Set(leads.map(c=>c.bairro).filter(Boolean))].sort().forEach(b=>lB.add(new Option(b,b)));
[...new Set(leads.map(c=>c.tipo).filter(Boolean))].sort().forEach(t=>lT.add(new Option(t,t)));
function vsmCell(v){if(v==null)return '—';const c=v<=-10?'b-green':v>=25?'b-red':'b-amber';const s=v>0?'+'+v:v;return `<span class="badge ${c}">${s}%</span>`;}
function renderLeads(){const bq=lB.value,tq=lT.value,ab=$('lAbaixo').checked,txt=$('lTexto').value.toLowerCase().trim();let rows=leads.filter(c=>(!bq||c.bairro===bq)&&(!tq||c.tipo===tq)&&(!ab||(c.vsm!=null&&c.vsm<=-10))&&(!txt||((c.end+' '+c.gestor+' '+c.desc).toLowerCase().includes(txt))));$('leadCount').textContent=rows.length.toLocaleString('pt-BR')+' imóveis';document.querySelector('#tLead tbody').innerHTML=rows.slice(0,400).map(c=>`<tr><td class="num">${sb(c.score)}</td><td>${c.bairro}</td><td>${c.tipo}</td><td title="${(c.desc||'').replace(/"/g,'')}">${c.end}</td><td class="num">${fmtBRL(c.preco)}</td><td class="num">${c.lm2?'R$ '+c.lm2.toLocaleString('pt-BR'):'—'}</td><td class="num">${c.mercado?'R$ '+c.mercado.toLocaleString('pt-BR'):'—'}</td><td class="num">${vsmCell(c.vsm)}</td><td style="color:var(--mut);font-size:12px">${c.motivos}</td><td>${c.link?`<a href="${c.link}" target="_blank">ver ↗</a>`:'—'}</td></tr>`).join('')+(rows.length>400?`<tr><td colspan="10" style="text-align:center;color:var(--mut)">Exibindo 400 de ${rows.length}.</td></tr>`:'');}
['lBairro','lTipo','lTexto','lAbaixo'].forEach(id=>$(id).addEventListener(id==='lTexto'?'input':'change',renderLeads));renderLeads();
const AREACOL={'Apartamento':C.acc,'Casa/Sobrado':C.green,'Studio/Kitnet':C.blue,'Cobertura/Duplex':C.amber};
new Chart(chArea,{type:'bar',data:{labels:PERFIL.area_labels.map(l=>l+' m²'),datasets:Object.keys(PERFIL.area_by_tipo).map(t=>({label:t,data:PERFIL.area_by_tipo[t],backgroundColor:AREACOL[t]||C.acc2}))},options:{maintainAspectRatio:false,plugins:{legend:{position:'top'}}}});
const lb=l=>{const c=l>=1.15?'b-green':l>=1.0?'b-amber':'b-blue';return `<span class="badge ${c}">${l.toFixed(2)}×</span>`;};
document.querySelector('#tLift tbody').innerHTML=PERFIL.lift_unit.map(x=>`<tr><td>${x.f}</td><td class="num">${x.sold}%</td><td class="num">${x.avail}%</td><td class="num">${lb(x.lift)}</td></tr>`).join('');
document.querySelector('#tLift2 tbody').innerHTML=PERFIL.lift_condo.map(x=>`<tr><td>${x.f}</td><td class="num">${x.sold}%</td><td class="num">${x.avail}%</td><td class="num">${lb(x.lift)}</td></tr>`).join('');
const pB=$('pBairro');PERFIL.bairros_list.forEach(b=>pB.add(new Option(b+' ('+PERFIL.perfil_bairro[b].n+' vendas)',b)));
const chip=t=>`<span class="badge b-blue" style="margin:2px 3px 2px 0">${t}</span>`;
function renderPerfil(){const p=PERFIL.perfil_bairro[pB.value];if(!p)return;const kv=(l,v)=>`<div class="kpi"><div class="v acc" style="font-size:18px">${v}</div><div class="l">${l}</div></div>`;$('perfilCard').innerHTML=`<div class="kpis" style="margin-bottom:16px">${kv('Tipo predominante',p.tipo)}${kv('Área típica',p.area_p25+'–'+p.area_p75+' m²')}${kv('Quartos',p.quartos??'—')}${kv('Vagas',p.vagas??'—')}${kv('Suítes',p.suites??'—')}${kv('Ticket mediano',fmtBRL(p.ticket))}${kv('R$/m² útil (ITBI)',p.itbi_m2?'R$ '+p.itbi_m2.toLocaleString('pt-BR'):'—')}</div><div class="grid"><div class="card"><h3>Características mais presentes nos vendidos</h3><div>${p.feats.map(f=>chip(f.f+' · '+f.pct+'%')).join('')}</div></div><div class="card"><h3>Diferenciais de condomínio mais presentes</h3><div>${p.condo.map(f=>chip(f.f+' · '+f.pct+'%')).join('')}</div></div></div>`;}
pB.addEventListener('change',renderPerfil);renderPerfil();
}
boot();
</script></body></html>
