# Dashboard de Mercado nonStop — alimentado por webhook

Painel de análise imobiliária (demanda, catálogo, sugestões, perfil de captação)
que se mantém atualizado **em tempo real** pelos webhooks da nonStop. Sem planilha,
sem seleção no Site — a base inteira, viva.

## Como funciona

```
nonStop  --(webhook: imóvel criado/atualizado/vendido)-->  função webhook  -->  Netlify Blobs (armazém)
                                                                                      |
navegador  <--(JSON agregado)--  função data  <---------------------------------------+
```

- `netlify/functions/webhook.mjs` — recebe os eventos e grava cada imóvel.
- `netlify/functions/data.mjs` — lê tudo, calcula as análises e devolve o JSON.
- `netlify/functions/seed.mjs` — carga inicial (uma vez, pela planilha).
- `public/index.html` — o dashboard (acesso por senha).
- `scripts/seed_from_xlsx.mjs` — script local que semeia a base a partir do export.

---

## Passo a passo de deploy

### 1. Criar o site no Netlify
1. Suba esta pasta para um repositório (GitHub) **ou** arraste-a em app.netlify.com → "Add new site" → "Deploy manually".
2. Se usar GitHub: em "Import project", selecione o repo. O `netlify.toml` já define tudo (publish = `public`, functions = `netlify/functions`).

### 2. Definir as variáveis de ambiente
No Netlify: **Site configuration → Environment variables**. Crie três:

| Variável | Para que serve | Exemplo |
|---|---|---|
| `NONSTOP_TOKEN` | seu token da nonStop (configurações → integração) | `nst_xxx...` |
| `WEBHOOK_SECRET` | senha que protege o webhook e o seed (invente uma) | `um-segredo-forte-123` |
| `ACCESS_KEY` | senha para abrir o dashboard | `outra-senha-456` |

> O `NONSTOP_TOKEN` só é necessário se você também for usar as rotas de API da nonStop.
> Para o fluxo por webhook, `WEBHOOK_SECRET` e `ACCESS_KEY` são o essencial.

### 3. Publicar
Clique em **Deploy**. Ao final você terá uma URL, ex.: `https://seu-site.netlify.app`.

### 4. Registrar o webhook na nonStop
Peça à nonStop (WhatsApp/GitHub na documentação) para apontar os webhooks de **Imóvel**
para esta URL — **já com o segredo na query**:

```
https://seu-site.netlify.app/.netlify/functions/webhook?secret=SEU_WEBHOOK_SECRET
```

Eventos tratados: `publication:create`, `property:update`, `property:delete`, `publication:delete`.

### 5. Carga inicial (uma única vez)
Na sua máquina, com a planilha exportada em mãos:

```bash
npm install xlsx
node scripts/seed_from_xlsx.mjs ./imoveis.xlsx https://seu-site.netlify.app SEU_WEBHOOK_SECRET
```

Isso envia todos os imóveis atuais para a base. Daí em diante, os webhooks mantêm tudo vivo.

### 6. Abrir o dashboard
Acesse `https://seu-site.netlify.app`, digite a `ACCESS_KEY` e pronto.

---

## Notas
- **Foco em São Paulo**: a análise filtra `cidade = "São Paulo"`. Para mudar/ampliar,
  edite `CITY` em `netlify/functions/_shared.mjs`.
- **Cache**: a função `data` tem cache de ~10 min no CDN. Use o refresh do navegador para forçar.
- **Perfil de Captação**: depende de `features`/`suites`, que vêm completos no webhook.
- **Próximo passo (ITBI)**: quando tiver as transações do ITBI, dá para cruzar por bairro
  e trocar o "preço competitivo" do lead score pela mediana real de mercado.
- **Segurança**: as senhas ficam nas variáveis de ambiente do Netlify, nunca no código.
  Para reforçar, o Netlify oferece proteção por senha no nível do site (planos pagos).
