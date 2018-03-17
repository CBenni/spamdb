import * as Koa from 'koa';
import * as cors from 'koa-cors';
import * as json from 'koa-json';
import * as mount from 'koa-mount';
import * as Router from 'koa-router';
import * as logger from './util/logger';

import 'reflect-metadata';

import * as configJson from '../config.json';

// import { authenticationMiddleware } from './middleware/auth';
import responseTime from './middleware/response-time';

import apiVersion1 from './api/v1';

const app = new Koa();
const router = new Router();


app.use(responseTime);
app.use(json({ pretty: false }));

app.use(cors());

app.use(mount('/v1', apiVersion1));

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(configJson.api.port);
logger.info(`Koa listening on port ${configJson.api.port}`);

export default app;
