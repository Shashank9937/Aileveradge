import OpenAI from "openai";
import { Pool } from "pg";
import { loadEnv } from "@ops-pilot/config";
import { logger } from "@ops-pilot/observability";

const env = loadEnv();
const db = new Pool({ connectionString: env.DATABASE_URL });
const client = env.OPENAI_API_KEY ? new OpenAI({ apiKey: env.OPENAI_API_KEY }) : null;

async function run(): Promise<void> {
  const opportunities = await db.query(
    `SELECT title, summary, annual_savings_usd FROM opportunities ORDER BY annual_savings_usd DESC LIMIT 20`
  );

  const prompt = `Given these opportunities, propose the top 3 product improvements:\n${JSON.stringify(
    opportunities.rows
  )}`;

  let recommendations = "No AI key configured. Review top opportunities manually.";
  if (client) {
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }]
    });
    recommendations = response.choices[0]?.message?.content ?? recommendations;
  }

  logger.info({ recommendations }, "product agent recommendations");
}

run()
  .then(async () => {
    await db.end();
  })
  .catch(async (error) => {
    logger.error({ error }, "product agent failed");
    await db.end();
    process.exit(1);
  });
