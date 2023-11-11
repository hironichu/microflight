import { Context, send } from "../deps.ts";

async function cssHandler(ctx: Context) {
  await send(ctx, "/main.css", {
    root: `${Deno.cwd()}/styles`,
    index: "main.css",
  });
}

async function imgHandler(ctx: Context) {
  await send(ctx, "/hero.jpg", {
    root: `${Deno.cwd()}/img`,
    index: "hero.jpg",
  });
}

export { cssHandler, imgHandler }