import Fastify from "fastify";
import cors from "@fastify/cors";
import { logger } from "@ops-pilot/observability";
import { dbPool } from "./db/pool.js";
import { executionQueue } from "./queues/execution-queue.js";
import { errorHandlerPlugin } from "./plugins/error-handler.js";
import { authPlugin } from "./plugins/auth.js";
import { connectorRoutes } from "./domains/connectors/routes.js";
import { opportunityRoutes } from "./domains/opportunities/routes.js";
import { actionRoutes } from "./domains/actions/routes.js";
import { policyRoutes } from "./domains/policies/routes.js";
import { savingsRoutes } from "./domains/savings/routes.js";
import { webhookRoutes } from "./domains/webhooks/routes.js";

export async function buildApp() {
  const app = Fastify({ logger: false });

  app.decorate("deps", {
    db: dbPool,
    executionQueue
  });

  app.register(cors, {
    origin: true,
    credentials: true
  });

  app.register(errorHandlerPlugin);
  app.register(authPlugin);

  app.get("/health", async () => ({
    status: "ok" as const,
    version: process.env.npm_package_version ?? "0.1.0",
    timestamp: new Date().toISOString()
  }));

  app.register(connectorRoutes, { prefix: "/v1/connectors" });
  app.register(opportunityRoutes, { prefix: "/v1/opportunities" });
  app.register(actionRoutes, { prefix: "/v1/actions" });
  app.register(policyRoutes, { prefix: "/v1/policies" });
  app.register(savingsRoutes, { prefix: "/v1/savings" });
  app.register(webhookRoutes, { prefix: "/v1/webhooks" });

  app.addHook("onClose", async () => {
    await Promise.all([dbPool.end(), executionQueue.close()]);
  });

  return app;
}

declare module "fastify" {
  interface FastifyInstance {
    deps: {
      db: typeof dbPool;
      executionQueue: typeof executionQueue;
    };
  }
}

logger.info("app initialized");
