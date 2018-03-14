import * as _ from 'lodash';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as send from 'koa-send';
import * as koaSwagger from 'koa2-swagger-ui';
import * as api from './api';
import { levelRequirement } from '../../middleware/auth';

const app = new Koa();
const router = new Router();

router.get('/swagger.json', async (ctx, next) => {
  await send(ctx, 'swagger.json', { root: __dirname });
});

app.use(koaSwagger({
  title: 'Logviewer API v1 - Twitch',
  routePrefix: '/docs',
  hideTopbar: true,
  swaggerOptions: {
    url: '/v1/swagger.json', // local path
  },
}));

router.get('/entries', levelRequirement('entries.get'));

app.use(router.routes());
app.use(router.allowedMethods());

export default app;

/*export default function registerRoutes(router: Router) {
  router.get('/entries', levelRequirement('entries.get'), (ctx, next) => {
    const query = {

    }
  });
}
*/
