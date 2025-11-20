import {
    Entity, BaseEntity, PrimaryGeneratedColumn,
    Column, CreateDateColumn, UpdateDateColumn
} from 'typeorm';

import { UserColor } from '@/constants/user-color';

@Entity({ name: 'user' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name?: string;

    @Column({ type: 'varchar', nullable: true })
    color?: UserColor;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: number;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: number;
}