FROM rust:latest as builder

WORKDIR /usr/src/app
COPY . .
# Will build and cache the binary and dependent crates in release mode
RUN --mount=type=cache,target=/usr/local/cargo,from=rust:latest,source=/usr/local/cargo \
    --mount=type=cache,target=target \
    cargo build --release && mv ./target/release/spirit_box_bot ./spirit_box_bot

# Runtime image
FROM debian:bookworm-slim
RUN apt update && apt install ca-certificates -y && apt-get clean
# Run as "app" user
RUN useradd -ms /bin/bash app

USER app
WORKDIR /app

# Get compiled binaries from builder's cargo install directory
COPY --from=builder /usr/src/app/spirit_box_bot /app/spirit_box_bot

# Run the app
CMD ./spirit_box_bot
