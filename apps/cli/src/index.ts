#!/usr/bin/env node
import { Command } from "commander";
import { OpsPilotApiClient } from "@ops-pilot/sdk";

const program = new Command();

program
  .name("opspilot")
  .description("OpsPilot CLI for savings and optimization visibility")
  .option("--api <url>", "API URL", process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000");

program
  .command("health")
  .description("Check API health")
  .action(async () => {
    const opts = program.opts<{ api: string }>();
    const client = new OpsPilotApiClient({ baseUrl: opts.api });
    const health = await client.health();
    console.log(JSON.stringify(health, null, 2));
  });

program
  .command("opportunities")
  .description("List opportunities")
  .action(async () => {
    const opts = program.opts<{ api: string }>();
    const client = new OpsPilotApiClient({ baseUrl: opts.api });
    const opportunities = await client.listOpportunities();
    console.table(
      opportunities.data.map((item) => ({
        id: item.id,
        title: item.title,
        annualSavingsUsd: item.annualSavingsUsd,
        riskLevel: item.riskLevel,
        status: item.status
      }))
    );
  });

program.parseAsync(process.argv);
