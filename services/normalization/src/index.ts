import { Worker } from "bullmq";
import { Pool } from "pg";
import { loadEnv } from "@ops-pilot/config";
import { logger } from "@ops-pilot/observability";

const env = loadEnv();
const db = new Pool({ connectionString: env.DATABASE_URL });

const worker = new Worker(
  "raw-ingestion",
  async (job) => {
    const { tenantId, provider, payload } = job.data as {
      tenantId: string;
      provider: "aws" | "gcp" | "azure" | "kubernetes" | "datadog";
      payload: Record<string, unknown>;
    };

    await db.query(
      `INSERT INTO cloud_events (id, tenant_id, provider, event_type, payload)
       VALUES (gen_random_uuid(), $1, $2, $3, $4::jsonb)`,
      [tenantId, provider, "raw.ingested", JSON.stringify(payload)]
    );

    logger.info({ tenantId, provider }, "normalized raw event");
  },
  {
    connection: { url: env.REDIS_URL },
    concurrency: 20
  }
);

worker.on("failed", (job, error) => {
  logger.error({ jobId: job?.id, error }, "normalization job failed");
});

async function gracefulShutdown(signal: string): Promise<void> {
  logger.info({ signal }, "shutting down normalization worker");
  await worker.close();
  await db.end();
  process.exit(0);
}

process.on("SIGINT", () => void gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => void gracefulShutdown("SIGTERM"));

logger.info("normalization worker started");
