import { Pool } from "pg";
import { loadEnv } from "@ops-pilot/config";
import { logger } from "@ops-pilot/observability";

const env = loadEnv();
const db = new Pool({ connectionString: env.DATABASE_URL });

async function reconcileLedger(): Promise<void> {
  const result = await db.query(
    `SELECT tenant_id, SUM(realized_savings_usd) as realized, COUNT(*)::int AS entries
     FROM savings_ledger
     WHERE period_end >= NOW() - interval '30 days'
     GROUP BY tenant_id`
  );

  for (const row of result.rows) {
    logger.info(
      {
        tenantId: row.tenant_id,
        realized30d: Number(row.realized),
        entries: row.entries
      },
      "reconciled savings ledger"
    );
  }
}

reconcileLedger()
  .then(async () => {
    await db.end();
  })
  .catch(async (error) => {
    logger.error({ error }, "ledger reconciliation failed");
    await db.end();
    process.exit(1);
  });
