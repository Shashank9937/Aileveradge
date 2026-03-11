import OpenAI from "openai";
import { Pool } from "pg";
import { loadEnv } from "@ops-pilot/config";
import { logger } from "@ops-pilot/observability";

const env = loadEnv();
const db = new Pool({ connectionString: env.DATABASE_URL });
const client = env.OPENAI_API_KEY ? new OpenAI({ apiKey: env.OPENAI_API_KEY }) : null;

async function run(): Promise<void> {
  const prompt =
    "List 5 emerging cloud pricing or infrastructure changes that can create savings opportunities. Return concise bullets.";

  let insights = "AI key unavailable; fallback insight list generated locally.";
  if (client) {
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }]
    });
    insights = response.choices[0]?.message?.content ?? insights;
  }

  await db.query(
    `INSERT INTO cloud_events (id, tenant_id, provider, event_type, payload)
     VALUES (gen_random_uuid(), $1, 'aws', 'research.insights', $2::jsonb)`,
    ["00000000-0000-0000-0000-000000000001", JSON.stringify({ insights })]
  );

  logger.info({ insights }, "research agent completed");
}

run()
  .then(async () => {
    await db.end();
  })
  .catch(async (error) => {
    logger.error({ error }, "research agent failed");
    await db.end();
    process.exit(1);
  });
