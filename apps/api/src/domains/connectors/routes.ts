import type { FastifyPluginAsync } from "fastify";
import { connectorCreateSchema } from "@ops-pilot/schemas";
import { ConnectorRepository } from "./repository.js";
import { paginated } from "../../utils/response.js";

export const connectorRoutes: FastifyPluginAsync = async (fastify) => {
  const repository = new ConnectorRepository(fastify.deps.db);

  fastify.get("/", async (request) => {
    const tenantId = request.authClaims?.tenantId;
    const connectors = await repository.listByTenant(tenantId);
    return paginated(connectors);
  });

  fastify.post("/", async (request, reply) => {
    const payload = connectorCreateSchema.parse(request.body);
    const created = await repository.create(payload);
    reply.code(201).send(created);
  });
};
