import type { FastifyPluginAsync } from "fastify";
import { OpportunityRepository } from "./repository.js";
import { paginated } from "../../utils/response.js";

export const opportunityRoutes: FastifyPluginAsync = async (fastify) => {
  const repository = new OpportunityRepository(fastify.deps.db);

  fastify.get("/", async (request) => {
    const tenantId = request.authClaims?.tenantId;
    const opportunities = await repository.listByTenant(tenantId);
    return paginated(opportunities);
  });
};
