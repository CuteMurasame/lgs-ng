import Router from 'koa-router';

const router = new Router({ prefix: '/article' });

import { ArticleService } from '@/services/article.service';
import { Context } from 'koa';

router.get('/:id', async (ctx: Context) => {
    const articleId = ctx.params.id;
    const article = await ArticleService.getArticleById(articleId);
    if (article) {
        ctx.success(article);
    } else {
        ctx.fail(404, 'Article not found');
    }
});

export default router;