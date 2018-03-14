import * as _ from 'lodash';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as models from '../db/models';
import configJson from '../config.json';

export async function authenticationMiddleware(ctx: Koa.Context, next:any) {
  const authHeader = ctx.get('Authentication');
  let token;
  if (authHeader) {
    [, token] = authHeader.split('=', 2);
  }
  if (ctx.query.auth_token) {
    token = ctx.query.auth_token;
  }

  ctx.user = null;
  ctx.level = 0;

  if (token) {
    const auth = await models.authModel.findOne({token}).populate('user');
    //const auth = await (await .findOne({ token })).populate();
    console.log('Auth found: ', auth);

    if (auth) {
      ctx.user = auth.user;
      ctx.level = (auth.user as models.User).level;
    }
  }

  await next();
}

export function levelRequirement(route: string) {
  const level:number = _.get(configJson.api.permissions, route);
  return async (ctx: Koa.Context, next:any) => {
    if (ctx.user.level >= level) {
      await next();
    } else {
      ctx.throw(403, 'Not allowed');
    }
  };
}

