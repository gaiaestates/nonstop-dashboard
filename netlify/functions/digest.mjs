// ============================================================
// Email diário AGENDADO (roda 1x/dia, não é acessível por URL).
// A lógica fica em _digest.mjs (compartilhada com o gatilho manual).
// ============================================================
import { buildAndSend } from "./_digest.mjs";

export const config = { schedule: "0 11 * * *" }; // 08:00 horário de Brasília (UTC-3)

export default async () => {
  const msg = await buildAndSend();
  return new Response(msg, { status: 200 });
};
