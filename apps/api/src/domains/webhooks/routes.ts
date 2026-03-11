import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";

const cloudEventSchema = z.object({
  tenantId: z.string().uuid(),
  provider: z.enum(["aws", "gcp", "azure", "kubernetes", "datadog"]),
  eventType: z.string().min(1),
  payload: z.record(z.string(), z.unknown())
});

export const webhookRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post("/cloud-events", async (request, reply) => {
    const event = cloudEventSchema.parse(request.body);

    await fastify.deps.db.query(
      `INSERT INTO cloud_events (id, tenant_id, provider, event_type, payload)
       VALUES (gen_random_uuid(), $1, $2, $3, $4::jsonb)`,
      [event.tenantId, event.provider, event.eventType, JSON.stringify(event.payload)]
    );

    reply.code(202).send({ accepted: true });
  });
};
