import * as Koa from 'koa';

export async function koaAuthentication(ctx: Koa.Context, next) {
  await next();
}
