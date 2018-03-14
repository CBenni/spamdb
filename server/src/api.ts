import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as mount from 'koa-mount';
import * as json from 'koa-json';
import cors from 'koa-cors';

import configJson from './config.json';

import responseTime from './middleware/response-time';
import { authenticationMiddleware } from './middleware/auth';
import errorMiddleware from './middleware/error';
import apiVersion1 from './api/v1/routes';

const app = new Koa();
const router = new Router();

app.listen(configJson.api.port);

app.use(responseTime);
app.use(json({ pretty: false }));

app.use(cors());
app.use(errorMiddleware);

app.use(authenticationMiddleware);
app.use(mount('/v1', apiVersion1));

app.use(router.routes());
app.use(router.allowedMethods());
