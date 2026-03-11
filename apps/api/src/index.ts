import { env } from "./config/env.js";
import { logger } from "@ops-pilot/observability";
import { buildApp } from "./app.js";

const app = await buildApp();

app.listen({ port: env.PORT, host: "0.0.0.0" })
  .then((address) => {
    logger.info({ address }, "api started");
  })
  .catch((error) => {
    logger.error({ error }, "failed to start api");
    process.exit(1);
  });
