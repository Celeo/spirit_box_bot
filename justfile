set dotenv-load := false

defualt: run

run:
    @deno run --allow-read=.env,.env.defaults --allow-net=discord.com,gateway.discord.gg main.ts

build:
    @deno compile --allow-read=.env,.env.defaults --allow-net=discord.com,gateway.discord.gg main.ts
