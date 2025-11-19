import Router from 'koa-router';
import articleRouter from './article.router';

const router = new Router();

router.use(articleRouter.routes(), articleRouter.allowedMethods());

export default router;