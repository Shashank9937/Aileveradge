import { NativeConnection, Worker } from "@temporalio/worker";
import { loadEnv } from "@ops-pilot/config";
import { logger } from "@ops-pilot/observability";

const env = loadEnv();

async function main() {
  const connection = await NativeConnection.connect({ address: env.TEMPORAL_ADDRESS });
  const workflowsPath = new URL(
    `./workflows.${process.env.NODE_ENV === "development" ? "ts" : "js"}`,
    import.meta.url
  ).pathname;
  const worker = await Worker.create({
    connection,
    namespace: env.TEMPORAL_NAMESPACE,
    workflowsPath,
    activities: {
      async summarize(message: string): Promise<string> {
        return `[agent-summary] ${message}`;
      }
    },
    taskQueue: "ops-pilot-agents"
  });

  logger.info("agent orchestrator running");
  await worker.run();
}

main().catch((error) => {
  logger.error({ error }, "agent orchestrator failed");
  process.exit(1);
});
