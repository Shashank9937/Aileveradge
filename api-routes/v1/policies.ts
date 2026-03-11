export const policiesRoute = {
  path: "/v1/policies",
  methods: ["GET", "POST"],
  validationEndpoint: "/v1/policies/validate"
} as const;
