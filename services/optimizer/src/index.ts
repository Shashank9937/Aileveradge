import { Pool } from "pg";
import OpenAI from "openai";
import { loadEnv } from "@ops-pilot/config";
import { logger } from "@ops-pilot/observability";

const env = loadEnv();
const db = new Pool({ connectionString: env.DATABASE_URL });
const client = env.OPENAI_API_KEY ? new OpenAI({ apiKey: env.OPENAI_API_KEY }) : null;

async function generateSummary(title: string, baseSummary: string): Promise<string> {
  if (!client) {
    return baseSummary;
  }

  const completion = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "user",
        content: `Rewrite this cloud optimization recommendation as concise execution guidance.\nTitle: ${title}\nSummary: ${baseSummary}`
      }
    ]
  });

  return completion.choices[0]?.message?.content ?? baseSummary;
}

async function runOptimizer(): Promise<void> {
  const result = await db.query(
    `SELECT id, title, summary FROM opportunities WHERE status IN ('new', 'reviewing') ORDER BY annual_savings_usd DESC LIMIT 50`
  );

  for (const row of result.rows) {
    const rewritten = await generateSummary(row.title as string, row.summary as string);
    await db.query(`UPDATE opportunities SET summary = $2, updated_at = NOW() WHERE id = $1`, [
      row.id,
      rewritten
    ]);
  }

  logger.info({ count: result.rowCount }, "optimizer updated opportunity narratives");
}

runOptimizer()
  .then(async () => {
    await db.end();
  })
  .catch(async (error) => {
    logger.error({ error }, "optimizer failed");
    await db.end();
    process.exit(1);
  });
