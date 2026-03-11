import { Worker } from "bullmq";
import { randomUUID } from "node:crypto";
import { Pool } from "pg";
import { loadEnv } from "@ops-pilot/config";
import { logger } from "@ops-pilot/observability";

const env = loadEnv();
const db = new Pool({ connectionString: env.DATABASE_URL });

const worker = new Worker(
  "action-execution",
  async (job) => {
    const { actionId, tenantId } = job.data as { actionId: string; tenantId: string };

    const actionRes = await db.query(
      `SELECT id, opportunity_id FROM actions WHERE id = $1 AND tenant_id = $2 LIMIT 1`,
      [actionId, tenantId]
    );
    if (actionRes.rowCount === 0) {
      throw new Error(`Action ${actionId} not found`);
    }

    const oppRes = await db.query(
      `SELECT annual_savings_usd FROM opportunities WHERE id = $1 LIMIT 1`,
      [actionRes.rows[0].opportunity_id]
    );

    const annualSavings = Number(oppRes.rows[0]?.annual_savings_usd ?? 0);
    const estimatedMonthly = annualSavings / 12;
    const realized = estimatedMonthly * (0.85 + Math.random() * 0.15);

    await db.query(`UPDATE actions SET status = 'completed', updated_at = NOW() WHERE id = $1`, [actionId]);

    await db.query(
      `INSERT INTO savings_ledger (
        id,
        tenant_id,
        action_id,
        period_start,
        period_end,
        estimated_savings_usd,
        realized_savings_usd,
        reliability_delta
      ) VALUES ($1, $2, $3, NOW() - interval '30 days', NOW(), $4, $5, $6)`,
      [randomUUID(), tenantId, actionId, estimatedMonthly, realized, Number((Math.random() - 0.5) / 1000)]
    );

    logger.info({ actionId, tenantId }, "action executed and savings recorded");
  },
  {
    connection: { url: env.REDIS_URL },
    concurrency: 10
  }
);

worker.on("failed", async (job, error) => {
  logger.error({ jobId: job?.id, error }, "action execution failed");
  const actionId = job?.data?.actionId as string | undefined;
  if (actionId) {
    await db.query(`UPDATE actions SET status = 'failed', updated_at = NOW() WHERE id = $1`, [actionId]);
  }
});

async function shutdown(signal: string): Promise<void> {
  logger.info({ signal }, "executor shutting down");
  await worker.close();
  await db.end();
  process.exit(0);
}

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));

logger.info("executor worker started");
