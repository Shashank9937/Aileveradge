export const actionsRoute = {
  path: "/v1/actions",
  methods: ["GET", "POST"] as const,
  subRoutes: ["/:id/approve", "/:id/execute"]
};
