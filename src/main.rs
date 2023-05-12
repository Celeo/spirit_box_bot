#![deny(clippy::all, clippy::pedantic)]

use anyhow::Result;
use dotenv::dotenv;
use log::{error, info, warn};
use messages::SPIRIT_BOX;
use rand::prelude::SliceRandom;
use std::{env, sync::Arc};
use twilight_gateway::{Event, Intents, Shard, ShardId};
use twilight_http::Client as HttpClient;

mod messages;

/// Entrypoint.
#[tokio::main]
async fn main() {
    dotenv().ok();
    if env::var("RUST_LOG").is_err() {
        env::set_var("RUST_LOG", "info");
    }
    pretty_env_logger::init();

    let token = env::var("DISCORD_BOT_TOKEN").expect("Missing 'DISCORD_BOT_TOKEN' env var");
    let intents = Intents::GUILD_MESSAGES | Intents::MESSAGE_CONTENT;
    let mut shard = Shard::new(ShardId::ONE, token.clone(), intents);
    let http = Arc::new(HttpClient::new(token));

    info!("Waiting for events");
    loop {
        let event = match shard.next_event().await {
            Ok(event) => event,
            Err(source) => {
                warn!("Error receiving event: {:?}", source);
                if source.is_fatal() {
                    break;
                }
                continue;
            }
        };
        let http = Arc::clone(&http);
        tokio::spawn(async move {
            if let Err(e) = handle_event(event, http).await {
                error!("Error in future: {e}");
            }
        });
    }
}

/// Handle a single Event from the Discord Gateway.
async fn handle_event(event: Event, http: Arc<HttpClient>) -> Result<()> {
    if let Event::MessageCreate(msg) = event {
        // never process bot messages
        if msg.author.bot {
            return Ok(());
        }

        // respond to specific comments
        let mut text = msg.content.to_lowercase();
        if text.ends_with('?') {
            text = text[0..text.len() - 1].to_string();
        }
        let text = text.trim();
        for pair in SPIRIT_BOX.iter() {
            if pair.0.contains(&text) {
                let response = pair.1.choose(&mut rand::thread_rng()).unwrap();
                http.create_message(msg.channel_id)
                    .reply(msg.id)
                    .content(response)?
                    .await?;
                return Ok(());
            }
        }
    }
    Ok(())
}
