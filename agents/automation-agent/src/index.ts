import { Pool } from "pg";
import { loadEnv } from "@ops-pilot/config";
import { logger } from "@ops-pilot/observability";

const env = loadEnv();
const db = new Pool({ connectionString: env.DATABASE_URL });

async function run(): Promise<void> {
  const checks = await Promise.all([
    db.query(`SELECT COUNT(*)::int AS count FROM actions WHERE status = 'failed'`),
    db.query(`SELECT COUNT(*)::int AS count FROM opportunities WHERE status = 'new'`),
    db.query(
      `SELECT COALESCE(SUM(realized_savings_usd), 0) AS total FROM savings_ledger WHERE period_end >= NOW() - interval '30 days'`
    )
  ]);

  logger.info(
    {
      failedActions: checks[0].rows[0].count,
      newOpportunities: checks[1].rows[0].count,
      realized30d: Number(checks[2].rows[0].total)
    },
    "automation health snapshot"
  );
}

run()
  .then(async () => {
    await db.end();
  })
  .catch(async (error) => {
    logger.error({ error }, "automation agent failed");
    await db.end();
    process.exit(1);
  });
