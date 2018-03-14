import * as Koa from "koa";

async function responseTime(ctx: Koa.Context, next) {
  const startTime: number = Date.now();
  await next();
  const endTime: number = Date.now();
  ctx.set("X-Response-Time", `${endTime - startTime}ms`);
}

export default responseTime;
