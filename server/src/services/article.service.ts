import { Cacheable } from '@/decorators/cacheable';
import { Article } from '@/entities/article';

export class ArticleService {
    @Cacheable(120, (id) => `article:${id}`)
    static async getArticleById(id: string): Promise<Article | null> {
        return await Article.findOne({ where: { id, deleted: false } });
    }


}