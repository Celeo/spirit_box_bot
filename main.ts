import {
  createBot,
  GatewayIntents,
  sendMessage,
  startBot,
} from "https://deno.land/x/discordeno@17.0.1/mod.ts";
import "https://deno.land/std@0.185.0/dotenv/load.ts";
import { SPIRIT_BOX } from "./messages.ts";

const DISCORD_BOT_TOKEN = "DISCORD_BOT_TOKEN";

export function getResponse(message: string): string | null {
  let content = message.toLowerCase();
  if (content.endsWith("?")) {
    content = content.substring(0, content.length - 1);
  }
  for (const info of SPIRIT_BOX) {
    if (info.triggers.includes(content)) {
      return info.responses[Math.floor(Math.random() * info.responses.length)];
    }
  }
  return null;
}

async function main(token: string | undefined): Promise<void> {
  if (!token) {
    console.log(
      `No token supplied; set the ${DISCORD_BOT_TOKEN} environment variable and run again`
    );
    return;
  }
  const bot = createBot({
    token,
    intents: GatewayIntents.GuildMessages | GatewayIntents.MessageContent,
    botId: BigInt(atob(token.split(".")[0])),
    events: {
      ready() {
        console.log("Successfully connected to gateway");
      },
      async messageCreate(_bot, message) {
        if (message.isFromBot) {
          return;
        }
        try {
          const content = getResponse(message.content);
          if (!content) {
            return;
          }
          await sendMessage(bot, message.channelId, {
            content,
            messageReference: {
              messageId: message.id,
              channelId: message.channelId,
              failIfNotExists: true,
            },
          });
        } catch (e) {
          console.error(`Error processing message: ${e}`);
        }
      },
    },
  });
  console.log("Starting bot ...");
  await startBot(bot);
}

if (import.meta.main) {
  await main(Deno.env.get(DISCORD_BOT_TOKEN));
}
