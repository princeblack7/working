import { Mastra } from "@mastra/core/mastra";
import { ConsoleLogger } from "@mastra/core/logger";
import { TelegramIntegration } from "./integrations/telegram";
// import { personalAssistantAgent } from "./agents/personalAssistantAgent";
// import { dailyWorkflow } from "./workflows";
import { LibSQLStore } from "@mastra/libsql";
import { kaiaDeFAIAgent } from "./agents/kaiaDefaiAgent";
// import { Agent2 } from "./agents/Agent2";
// import { Agent3 } from "./agents/Agent3";
// import { weatherAgent } from "./agents/weatherAgent";


const mastraStorageUrl = process.env.TURSO_DATABASE_URL ?? process.env.DATABASE_URL ?? "file:./mastra.db";
const mastraStorageConfig: Record<string, string> = {
  url: mastraStorageUrl,
};
if (process.env.TURSO_AUTH_TOKEN) {
  mastraStorageConfig.authToken = process.env.TURSO_AUTH_TOKEN;
}

export const mastra: Mastra = new Mastra({
  agents: {
    kaiaDeFAIAgent,
  },
  logger: new ConsoleLogger({
    level: "info",
  }),
  storage: new LibSQLStore(mastraStorageConfig),
});

// Initialize Telegram bot if token is available
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!TELEGRAM_BOT_TOKEN) {
  console.error("TELEGRAM_BOT_TOKEN is not set in environment variables");
  process.exit(1);
}

// Start the Telegram bot
export const telegramBot = new TelegramIntegration(TELEGRAM_BOT_TOKEN);
console.log("Telegram bot integration initialized.");
