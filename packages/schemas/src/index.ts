import { z } from "zod";

export const healthSchema = z.object({
  status: z.literal("ok"),
  version: z.string(),
  timestamp: z.string()
});

export const connectorTypeSchema = z.enum(["aws", "gcp", "azure", "kubernetes", "datadog"]);

export const connectorCreateSchema = z.object({
  tenantId: z.string().uuid(),
  name: z.string().min(2),
  type: connectorTypeSchema,
  config: z.record(z.string(), z.unknown())
});

export const connectorSchema = connectorCreateSchema.extend({
  id: z.string().uuid(),
  status: z.enum(["pending", "active", "failed", "disabled"]),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const opportunitySchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
  title: z.string(),
  summary: z.string(),
  category: z.enum(["rightsizing", "scheduling", "storage", "network", "kubernetes", "gpu"]),
  annualSavingsUsd: z.number(),
  confidence: z.number().min(0).max(1),
  riskLevel: z.enum(["low", "medium", "high"]),
  status: z.enum(["new", "reviewing", "approved", "executing", "completed", "dismissed"]),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const actionCreateSchema = z.object({
  tenantId: z.string().uuid(),
  opportunityId: z.string().uuid(),
  mode: z.enum(["recommend", "auto_pr", "autopilot"]),
  approvalsRequired: z.number().int().min(0).default(1)
});

export const actionSchema = actionCreateSchema.extend({
  id: z.string().uuid(),
  status: z.enum(["draft", "pending_approval", "approved", "running", "completed", "rolled_back", "failed"]),
  runbook: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const policySchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
  key: z.string(),
  description: z.string(),
  value: z.record(z.string(), z.unknown()),
  enabled: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const savingsLedgerEntrySchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
  actionId: z.string().uuid(),
  periodStart: z.string(),
  periodEnd: z.string(),
  estimatedSavingsUsd: z.number(),
  realizedSavingsUsd: z.number(),
  reliabilityDelta: z.number(),
  createdAt: z.string()
});

export const paginatedSchema = <T extends z.ZodTypeAny>(item: T) =>
  z.object({
    data: z.array(item),
    total: z.number().int().min(0)
  });

export type ConnectorCreateInput = z.infer<typeof connectorCreateSchema>;
export type Connector = z.infer<typeof connectorSchema>;
export type Opportunity = z.infer<typeof opportunitySchema>;
export type Action = z.infer<typeof actionSchema>;
export type ActionCreateInput = z.infer<typeof actionCreateSchema>;
export type Policy = z.infer<typeof policySchema>;
export type SavingsLedgerEntry = z.infer<typeof savingsLedgerEntrySchema>;
