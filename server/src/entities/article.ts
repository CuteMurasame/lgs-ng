import {
    Entity, BaseEntity, PrimaryColumn,
    Column, CreateDateColumn, UpdateDateColumn, Index
} from 'typeorm';

import { User } from './user';
import { ArticleCategory } from '@/constants/article-category';

@Entity({ name: 'article' })
@Index('idx_articles_author', ['authorUid'])
@Index('idx_articles_deleted_priority_updated_at', ['deleted', 'priority', 'updatedAt'])
@Index('idx_created_at', ['createdAt'])
@Index('idx_priority', ['priority'])
@Index('idx_updated_at', ['updatedAt'])
export class Article extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 8 })
    id: string;

    @Column()
    title: string;

    @Column({ type: 'mediumtext', nullable: true })
    content: string | null;

    @Column({ type: 'int', name: 'author_uid', unsigned: true })
    authorUid: number | null;

    @Column({ type: 'int', nullable: true })
    category: ArticleCategory | null;

    @Column({ type: 'int', nullable: true })
    upvote: number | null;

    @Column({ type: 'int', name: 'favor_count', nullable: true })
    favorCount: number | null;

    @Column({ type: 'varchar', name: 'solution_for_pid', length: 50, nullable: true })
    solutionForPid: string | null;

    @Column({ default: 0 })
    priority: number;

    @Column({ type: 'tinyint', default: 0 })
    deleted: boolean;

    @Column({ type: 'longtext', nullable: true })
    tags: string | null;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: number;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: number;

    @Column({ name: 'deleted_reason', default: '作者要求删除' })
    deletedReason: string;

    @Column({ type: 'text', name: 'content_hash', nullable: true })
    contentHash: string | null;

    author?: User | null;

    async loadRelationships() {
        this.author = this.authorUid ? await User.findOne({ where: { id: this.authorUid } }) : null;
    }
}