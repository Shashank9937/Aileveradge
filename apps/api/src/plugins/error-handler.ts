import fp from "fastify-plugin";
import { ZodError } from "zod";
import { logger } from "@ops-pilot/observability";

export const errorHandlerPlugin = fp(async (fastify) => {
  fastify.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
      reply.code(400).send({ message: "Validation failed", issues: error.issues });
      return;
    }

    logger.error({ err: error, path: request.url }, "request failed");
    reply.code(500).send({ message: "Internal server error" });
  });
});
