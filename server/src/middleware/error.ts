import * as Koa from "koa";

async function error(ctx: Koa.Context, next) {

  try {
    await next();
  } catch (e) {
    const message = e.message || e.toString() || "An unknown error occurred.";
    ctx.status = e.status || 500;
    return ctx.body = {
      success: false,
      error: message
    };
  }

  // Errors that TSOA catches
  if (ctx.status >= 300) {
    let error = "An unknown error occurred.";
    if (ctx.body && ctx.body.name === "ValidateError") {
      error = ctx.body;
    } else if (ctx.body) {
      error = ctx.body.toString();
    }
    return ctx.body = {
      success: false,
      error
    };
  }

}

export default error;
