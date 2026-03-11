import type { FastifyPluginAsync } from "fastify";
import { actionCreateSchema } from "@ops-pilot/schemas";
import { ActionRepository } from "./repository.js";
import { paginated } from "../../utils/response.js";

export const actionRoutes: FastifyPluginAsync = async (fastify) => {
  const repository = new ActionRepository(fastify.deps.db);

  fastify.get("/", async (request) => {
    const tenantId = request.authClaims?.tenantId;
    const actions = await repository.listByTenant(tenantId);
    return paginated(actions);
  });

  fastify.post("/", async (request, reply) => {
    const payload = actionCreateSchema.parse(request.body);
    const created = await repository.create(payload);
    reply.code(201).send(created);
  });

  fastify.post<{ Params: { id: string } }>("/:id/approve", async (request, reply) => {
    const updated = await repository.updateStatus(request.params.id, "approved");
    if (!updated) {
      reply.code(404).send({ message: "Action not found" });
      return;
    }
    reply.send(updated);
  });

  fastify.post<{ Params: { id: string } }>("/:id/execute", async (request, reply) => {
    const updated = await repository.updateStatus(request.params.id, "running");
    if (!updated) {
      reply.code(404).send({ message: "Action not found" });
      return;
    }

    await fastify.deps.executionQueue.add("execute-action", {
      actionId: updated.id,
      tenantId: updated.tenantId
    });

    reply.code(202).send(updated);
  });
};
