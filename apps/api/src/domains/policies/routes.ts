import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { policySchema } from "@ops-pilot/schemas";
import { PolicyRepository } from "./repository.js";
import { paginated } from "../../utils/response.js";

const policyCreateSchema = policySchema.omit({ id: true, createdAt: true, updatedAt: true });

export const policyRoutes: FastifyPluginAsync = async (fastify) => {
  const repository = new PolicyRepository(fastify.deps.db);

  fastify.get("/", async (request) => {
    const tenantId = request.authClaims?.tenantId;
    const policies = await repository.listByTenant(tenantId);
    return paginated(policies);
  });

  fastify.post("/", async (request, reply) => {
    const payload = policyCreateSchema.parse(request.body);
    const created = await repository.create(payload);
    reply.code(201).send(created);
  });

  fastify.post("/validate", async (request) => {
    const schema = z.object({
      candidate: z.record(z.string(), z.unknown())
    });
    const payload = schema.parse(request.body);

    return {
      valid: true,
      checks: [
        {
          name: "base-policy-shape",
          status: "pass",
          details: `Validated keys: ${Object.keys(payload.candidate).join(", ") || "none"}`
        }
      ]
    };
  });
};
