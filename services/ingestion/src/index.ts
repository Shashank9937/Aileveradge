import { Queue } from "bullmq";
import { Pool } from "pg";
import { loadEnv } from "@ops-pilot/config";
import { logger } from "@ops-pilot/observability";

const env = loadEnv();
const db = new Pool({ connectionString: env.DATABASE_URL });

interface RawIngestionJob {
  tenantId: string;
  connectorId: string;
  provider: string;
  payload: Record<string, unknown>;
}

const ingestionQueue = new Queue<RawIngestionJob>("raw-ingestion", {
  connection: { url: env.REDIS_URL }
});

async function enqueueConnectorPolls(): Promise<void> {
  const result = await db.query(`SELECT id, tenant_id, type FROM connectors WHERE status = 'active'`);

  for (const row of result.rows) {
    await ingestionQueue.add("ingest-connector", {
      tenantId: row.tenant_id,
      connectorId: row.id,
      provider: row.type,
      payload: {
        sampledAt: new Date().toISOString(),
        source: "poller"
      }
    });
  }

  logger.info({ count: result.rowCount }, "queued ingestion jobs");
}

async function run(): Promise<void> {
  await enqueueConnectorPolls();
  await Promise.all([ingestionQueue.close(), db.end()]);
}

run().catch((error) => {
  logger.error({ error }, "ingestion failed");
  process.exit(1);
});
