import OpenAI from "openai";
import { z } from "zod";
import { loadEnv } from "@ops-pilot/config";
import { logger } from "@ops-pilot/observability";

const env = loadEnv();
const client = env.OPENAI_API_KEY ? new OpenAI({ apiKey: env.OPENAI_API_KEY }) : null;

const ticketSchema = z.object({
  id: z.string(),
  customer: z.string(),
  issue: z.string(),
  severity: z.enum(["low", "medium", "high"])
});

async function draftReply(ticket: z.infer<typeof ticketSchema>): Promise<string> {
  if (!client) {
    return "Thank you for reporting this. Our team is investigating and will share a mitigation path shortly.";
  }

  const prompt = `You are OpsPilot support. Draft a concise response for this ticket: ${JSON.stringify(
    ticket
  )}`;

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }]
  });
  return response.choices[0]?.message?.content ?? "Support response unavailable.";
}

async function run(): Promise<void> {
  const ticket = ticketSchema.parse({
    id: "sample-1",
    customer: "Acme Cloud",
    issue: "Why did an action stop in pending_approval?",
    severity: "medium"
  });

  const response = await draftReply(ticket);
  logger.info({ ticketId: ticket.id, response }, "support agent response drafted");
}

run().catch((error) => {
  logger.error({ error }, "support agent failed");
  process.exit(1);
});
