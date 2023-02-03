FROM denoland/deno:latest AS build

WORKDIR /opt
COPY main.ts messages.ts deps.ts deno.jsonc /opt/
RUN ["deno", "task", "compile"]

FROM denoland/deno:alpine AS run

WORKDIR /opt
COPY --from=build /opt/spirit_box_bot .

CMD ["/opt/spirit_box_bot"]
