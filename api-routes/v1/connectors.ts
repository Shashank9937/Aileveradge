/**
 * API contract reference for /v1/connectors.
 * GET: list connectors
 * POST: create connector
 */
export const connectorRoute = {
  path: "/v1/connectors",
  methods: ["GET", "POST"] as const
};
