import * as _ from 'lodash';
import * as Koa from 'koa';

import * as models from '../../db/models';


getEntries(async (ctx : Koa.Context, next) => {
  const query:any = {};
  if (ctx.query['since']) {
    query.updatedAt = { $ge: new Date(ctx.query['since']) };
  }
  const entries = models.userModel.find(query);
});
