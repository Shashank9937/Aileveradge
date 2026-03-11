import { proxyActivities } from "@temporalio/workflow";

const { summarize } = proxyActivities<{ summarize: (message: string) => Promise<string> }>({
  startToCloseTimeout: "1 minute"
});

export async function runSupportDigest(tenantId: string): Promise<string> {
  return summarize(`support digest generated for tenant ${tenantId}`);
}

export async function runGrowthExperiment(name: string): Promise<string> {
  return summarize(`growth experiment analyzed: ${name}`);
}
