// ============================================================
// Gatilho MANUAL do email (para testar quando quiser).
// Abra: https://SEU-SITE.netlify.app/.netlify/functions/send-digest?secret=SEU_SEGREDO
// Protegido pelo mesmo WEBHOOK_SECRET.
// ============================================================
import { buildAndSend } from "./_digest.mjs";

export default async (req) => {
  const secret = new URL(req.url).searchParams.get("secret") || req.headers.get("x-webhook-secret");
  if (!process.env.WEBHOOK_SECRET || secret !== process.env.WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }
  const msg = await buildAndSend();
  return new Response(msg, { status: 200 });
};
