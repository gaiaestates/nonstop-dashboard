# Deploy pelo GitHub + Netlify (sem gastar créditos)

Como você já ligou o GitHub ao Netlify, o fluxo é: **subir os arquivos no GitHub → Netlify faz o deploy sozinho**. Depois, toda vez que os arquivos mudarem no GitHub, o site atualiza automaticamente.

## O que tem neste projeto
```
nonstop-dashboard/
├── netlify.toml                 # config (publish=public, functions, esbuild)
├── package.json
├── public/index.html            # o dashboard (com ITBI + lead score de mercado)
├── netlify/functions/
│   ├── webhook.mjs              # recebe eventos da nonStop → grava no Netlify Blobs
│   ├── data.mjs                 # agrega tudo + ITBI → devolve JSON pro dashboard
│   ├── seed.mjs                 # carga inicial (uma vez, pela planilha)
│   ├── _shared.mjs              # análise (helper, ignorado como função)
│   └── _itbi_bench.mjs          # base ITBI embutida (R$/m² por bairro)  ← estático
└── scripts/seed_from_xlsx.mjs   # script local de carga inicial
```
> Arquivos que começam com `_` são helpers — o Netlify não os expõe como endpoints.

---

## Passo 1 — Criar o repositório no GitHub
1. Em github.com → **New repository** → nome ex. `nonstop-dashboard` → **Private** → Create.
2. Na página do repo vazio → **uploading an existing file**.
3. Arraste **todo o conteúdo** da pasta `nonstop-dashboard` (as subpastas `public/`, `netlify/`, `scripts/` e os arquivos da raiz). O GitHub preserva a estrutura.
4. **Commit changes**.

## Passo 2 — Importar no Netlify
1. Netlify → **Add new site → Import an existing project → Deploy with GitHub**.
2. Escolha o repo `nonstop-dashboard`. O Netlify lê o `netlify.toml` sozinho (não precisa configurar build).
3. **Deploy site**. Sai uma URL tipo `https://seu-site.netlify.app`.

## Passo 3 — Variáveis de ambiente
Netlify → **Site configuration → Environment variables** → crie:

| Variável | Para quê | Exemplo |
|---|---|---|
| `WEBHOOK_SECRET` | protege o webhook e o seed (invente) | `ns-wh-9f2k7x` |
| `ACCESS_KEY` | senha para abrir o dashboard | `gaia-2026` |

Depois, **Deploys → Trigger deploy → Deploy site** (para pegar as variáveis).

## Passo 4 — Registrar o webhook na nonStop
Em `https://www.usenonstop.com/configuracoes?tab=webhook`, cadastre a URL:
```
https://seu-site.netlify.app/.netlify/functions/webhook?secret=SEU_WEBHOOK_SECRET
```
Marque os eventos de imóvel (create/update/delete).

## Passo 5 — Carga inicial (uma vez)
Na sua máquina, dentro da pasta do projeto:
```
npm install xlsx
node scripts/seed_from_xlsx.mjs "H:\Meu Drive\Trabalho\Analises de Mercado\imoveis.xlsx" https://seu-site.netlify.app SEU_WEBHOOK_SECRET
```
A partir daí os webhooks mantêm a base viva.

## Passo 6 — Abrir
Acesse a URL, digite a `ACCESS_KEY`. Pronto — dashboard no ar, atualizando sozinho.

---

## Atualizações futuras (sem créditos)
- **Mudou algo no dashboard/código:** eu te entrego os arquivos novos, você substitui no GitHub (arrastar e commitar) → o Netlify redeploya sozinho.
- **Atualizar o ITBI:** rode o `de_para_area.py` de novo, me mande os CSVs, eu regenero o `_itbi_bench.mjs`, você commita. (O ITBI muda devagar — dá pra fazer a cada poucos meses.)

## Teste rápido (opcional, antes da nonStop ligar o webhook)
```
curl -X POST "https://seu-site.netlify.app/.netlify/functions/webhook?secret=SEU_WEBHOOK_SECRET" \
  -H "content-type: application/json" \
  -d '{"event":"property:update","property":{"base36Id":"TESTE1","type":"APARTAMENTO_TIPO","transactionStatus":"VENDIDO","rooms":3,"parkingLots":[{}],"values":{"sale":900000},"areas":{"useful":90},"address":{"area":"Moema","city":"São Paulo"},"user":{"name":"Teste","slug":"teste"},"features":["SACADA"]}}'
```
Abra o dashboard: o imóvel de teste aparece (some quando o seed real rodar).
