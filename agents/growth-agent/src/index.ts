import OpenAI from "openai";
import { loadEnv } from "@ops-pilot/config";
import { logger } from "@ops-pilot/observability";

const env = loadEnv();
const client = env.OPENAI_API_KEY ? new OpenAI({ apiKey: env.OPENAI_API_KEY }) : null;

async function run(): Promise<void> {
  const basePrompt =
    "Create 3 high-intent SEO article briefs for a cloud cost optimization product with clear keyword targets and CTA.";

  let output = "No AI key configured; default to manual growth backlog.";
  if (client) {
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: basePrompt }]
    });
    output = response.choices[0]?.message?.content ?? output;
  }

  logger.info({ output }, "growth agent generated content briefs");
}

run().catch((error) => {
  logger.error({ error }, "growth agent failed");
  process.exit(1);
});
