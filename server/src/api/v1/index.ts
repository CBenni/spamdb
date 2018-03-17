import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as send from 'koa-send';
import * as koaSwagger from 'koa2-swagger-ui';

// Import all controllers here so TSOA can find them when compiling
import './controllers/index';

import errorMiddleware from './middlewares/error';
import { RegisterRoutes } from './routes';

const app: Koa = new Koa();
const router: Router = new Router();

RegisterRoutes(router);

router.get('/swagger.json', async (ctx, next) => {
  await send(ctx, 'swagger.json', { root: __dirname });
});

app.use(koaSwagger({
  title: 'SpamDB API v1',
  routePrefix: '/docs',
  swaggerOptions: {
    url: '/v1/swagger.json', // local path
  }
}));

app.use(errorMiddleware);

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
