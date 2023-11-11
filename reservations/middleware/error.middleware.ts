import {
    Status,
  } from "../deps.ts";

  import { Context } from "./../types.ts";
  
  const errorMiddleware = async (ctx: Context, next: () => Promise<void>) => {
    try {
      await next();
    } catch (err) {
      const message = err.message;
      const status = err.status || err.statusCode || Status.InternalServerError;
  
      ctx.response.status = status;
      ctx.response.body = { status, message };
    }
  };
  
  export { errorMiddleware };