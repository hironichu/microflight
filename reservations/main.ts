import {Application, viewEngine, etaEngine, oakAdapter} from "./deps.ts";
import { router } from "./routes/routes.ts";
// import * as middlewares from "./middleware/middlewares.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

import db from "./db/db.ts";
const app = new Application();

app.use(
  viewEngine(oakAdapter, etaEngine, {
    viewRoot: "./views"
  })
);
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });

db.close();