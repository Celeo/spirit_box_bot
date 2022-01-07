import {
  config,
  createBot,
  enableCachePlugin,
  enableCacheSweepers,
  startBot,
  sendMessage,
} from "./deps.ts";
import { SPIRIT_BOX } from "./messages.ts";

const DISCORD_BOT_TOKEN = "DISCORD_BOT_TOKEN";

async function main(token: string | undefined): Promise<void> {
  if (!token) {
    console.log(
      `No token supplied, set the ${DISCORD_BOT_TOKEN} environment variable and run again`
    );
    return;
  }
  const baseBot = createBot({
    token,
    intents: ["Guilds", "GuildMessages"],
    botId: BigInt(atob(token.split(".")[0])),
    events: {
      ready() {
        console.log("Successfully connected to gateway");
      },
      messageCreate(_bot, message) {
        if (message.isBot) {
          return;
        }
        try {
          const content = message.content.toLowerCase();
          for (const info of SPIRIT_BOX) {
            if (info.triggers.includes(content)) {
              const content =
                info.responses[
                  Math.ceil(Math.random() * info.responses.length) - 1
                ];
              sendMessage(bot, message.channelId, {
                content,
                messageReference: {
                  messageId: message.id,
                  channelId: message.channelId,
                  failIfNotExists: true,
                },
              });
              return;
            }
          }
        } catch (e) {
          console.error(`Error processing message: ${e}`);
        }
      },
    },
  });
  const bot = enableCachePlugin(baseBot);
  enableCacheSweepers(bot);
  console.log("Starting bot ...");
  await startBot(bot);
}

if (import.meta.main) {
  const dotenv = config();
  await main(dotenv[DISCORD_BOT_TOKEN]);
}
