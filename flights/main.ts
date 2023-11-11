import { Application, etaEngine, oakAdapter, viewEngine } from "./deps.ts";
import router from "./routes/router.ts";

const app = new Application();

app.use(
  viewEngine(oakAdapter, etaEngine, {
    viewRoot: "./views",
  }),
);

app.use(router.routes());

await app.listen({ port: 8000 });
