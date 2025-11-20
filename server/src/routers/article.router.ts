import Router from 'koa-router';

const router = new Router({ prefix: '/article' });

import { ArticleService } from '@/services/article.service';
import { Context } from 'koa';
import { truncateUtf8 } from "@/utils/string";

router.get('/query/:id', async (ctx: Context) => {
    const articleId = ctx.params.id;
    const article = await ArticleService.getArticleById(articleId);
    if (article) {
        if (article.deleted) {
            ctx.fail(403, article.deletedReason);
        }
        else {
            ctx.success(article);
        }
    }
    else {
        ctx.fail(404, 'Article not found');
    }
});

router.get('/recent', async (ctx: Context) => {
    const count = Math.min(100, Number(ctx.query.count) || 20);
    const updatedAfterStr = ctx.query.updated_after as string | undefined;
    const updatedAfter = updatedAfterStr ? new Date(updatedAfterStr) : undefined;
    const truncatedCount = Math.min(Number(ctx.query.truncated_count) || 200, 600);

    const articles = await ArticleService.getRecentArticles(count, updatedAfter);
    const sanitizedArticles = articles.map((article) => ({
        ...article,
        content: truncateUtf8(article.content, truncatedCount)
    }));
    ctx.success(sanitizedArticles);
});

export default router;