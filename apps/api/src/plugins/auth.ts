import fp from "fastify-plugin";
import { verifyAccessToken, type AuthClaims } from "@ops-pilot/auth";
import type { FastifyRequest } from "fastify";
import { env } from "../config/env.js";

declare module "fastify" {
  interface FastifyRequest {
    authClaims: AuthClaims | null;
  }
}

function extractBearer(request: FastifyRequest): string | null {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return null;
  }
  const [scheme, token] = authHeader.split(" ");
  if (!scheme || !token || scheme.toLowerCase() !== "bearer") {
    return null;
  }
  return token;
}

export const authPlugin = fp(async (fastify) => {
  fastify.decorateRequest("authClaims", null);

  fastify.addHook("onRequest", async (request, reply) => {
    const token = extractBearer(request);
    if (!token) {
      return;
    }

    if (!env.JWT_PUBLIC_KEY) {
      reply.code(500).send({ message: "JWT_PUBLIC_KEY not configured" });
      return;
    }

    try {
      request.authClaims = await verifyAccessToken(
        token,
        env.JWT_ISSUER,
        env.JWT_AUDIENCE,
        env.JWT_PUBLIC_KEY
      );
    } catch {
      reply.code(401).send({ message: "Invalid or expired token" });
    }
  });
});
