import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

import { config } from './config';
import { AppDataSource } from './data-source';

import router from './routers';
import { logger } from './utils/logger';

import { responseHelper } from './middlewares/response';

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(responseHelper);
app.use(router.routes()).use(router.allowedMethods());

AppDataSource.initialize()
    .then(() => {
        app.listen(config.port, () => {
            logger.info({ port: config.port }, `Server started.`);
        });
    });