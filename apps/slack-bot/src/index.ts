import { App } from "@slack/bolt";
import { loadEnv } from "@ops-pilot/config";
import { logger } from "@ops-pilot/observability";

const env = loadEnv();

if (!env.SLACK_SIGNING_SECRET || !env.SLACK_BOT_TOKEN) {
  logger.warn("Slack credentials not configured; slack-bot is disabled");
  process.exit(0);
}

const app = new App({
  token: env.SLACK_BOT_TOKEN,
  signingSecret: env.SLACK_SIGNING_SECRET
});

app.command("/opspilot-status", async ({ ack, respond }) => {
  await ack();
  await respond({
    response_type: "ephemeral",
    text: "OpsPilot is online. Use the dashboard for action approvals and savings verification."
  });
});

await app.start(Number(process.env.SLACK_PORT ?? 3002));
logger.info("Slack bot started");
