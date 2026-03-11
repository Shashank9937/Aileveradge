import type { FastifyPluginAsync } from "fastify";
import { SavingsRepository } from "./repository.js";
import { paginated } from "../../utils/response.js";

export const savingsRoutes: FastifyPluginAsync = async (fastify) => {
  const repository = new SavingsRepository(fastify.deps.db);

  fastify.get("/", async (request) => {
    const tenantId = request.authClaims?.tenantId;
    const entries = await repository.listByTenant(tenantId);
    return paginated(entries);
  });
};
