# Deploy pelo Claude Code — passo único

Você já tem a conta Netlify vinculada. Abra o Claude Code **dentro da pasta
`nonstop-dashboard`** e cole o prompt abaixo. Antes, escolha dois segredos:

- `WEBHOOK_SECRET` → invente um valor forte (ex.: `ns-wh-9f2k7x`). Protege o webhook.
- `ACCESS_KEY` → a senha para abrir o dashboard (ex.: `painel-rick-2026`).

> Guarde o `WEBHOOK_SECRET`: você vai reutilizá-lo na página de webhook da nonStop
> e no comando de carga inicial (seed).

---

## Prompt para colar no Claude Code

```
Faça o deploy deste projeto Netlify (pasta atual) usando a Netlify CLI.

Passos:
1. Se necessário, instale a CLI: npm install -g netlify-cli
2. Garanta login (minha conta já está vinculada): netlify status
3. Crie um site novo e faça o link desta pasta: netlify sites:create --name nonstop-dashboard-rick   (se o nome existir, escolha outro parecido) e depois netlify link ao site criado.
4. Configure as variáveis de ambiente de produção:
   netlify env:set WEBHOOK_SECRET "COLE_AQUI_SEU_WEBHOOK_SECRET"
   netlify env:set ACCESS_KEY "COLE_AQUI_SUA_ACCESS_KEY"
5. Instale dependências e faça o deploy de produção:
   npm install
   netlify deploy --prod
6. No final, me imprima:
   - a URL pública do site
   - a URL do webhook no formato:
     https://<URL-DO-SITE>/.netlify/functions/webhook?secret=<WEBHOOK_SECRET>
   - a URL do dashboard (raiz do site)

Não exponha os segredos em logs além do necessário. O Netlify Blobs é usado pelas
funções e é provisionado automaticamente — não precisa de configuração extra.
```

---

## Depois que o deploy terminar

1. **Cadastrar o webhook** em `https://www.usenonstop.com/configuracoes?tab=webhook`:
   cole a **URL do webhook** que o Claude Code imprimiu (já com `?secret=...`) e
   marque os eventos de imóvel (create/update/delete).

2. **Carga inicial** (uma vez), na pasta do projeto, com a planilha exportada:
   ```
   npm install xlsx
   node scripts/seed_from_xlsx.mjs ./imoveis.xlsx https://<URL-DO-SITE> <WEBHOOK_SECRET>
   ```

3. **Abrir o dashboard**: acesse a URL do site, digite a `ACCESS_KEY`. Pronto.

## Teste rápido (opcional, antes de ligar o webhook na nonStop)
Para ver um imóvel entrar na base manualmente:
```
curl -X POST "https://<URL-DO-SITE>/.netlify/functions/webhook?secret=<WEBHOOK_SECRET>" \
  -H "content-type: application/json" \
  -d '{"event":"property:update","property":{"base36Id":"TESTE1","type":"APARTAMENTO_TIPO","transactionStatus":"VENDIDO","rooms":3,"parkingLots":[{}],"values":{"sale":900000},"areas":{"useful":90},"address":{"area":"Moema","city":"São Paulo"},"user":{"name":"Teste","slug":"teste"},"features":["SACADA"]}}'
```
Depois abra o dashboard — o imóvel de teste aparece. (Some quando o seed real rodar.)
