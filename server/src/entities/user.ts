import {
    Entity, BaseEntity, PrimaryGeneratedColumn,
    Column, CreateDateColumn, UpdateDateColumn
} from 'typeorm';

import { UserColor } from '@/constants/user-color';

@Entity({ name: 'user' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: true })
    name: string | null;

    @Column({ type: 'varchar', nullable: true })
    color: UserColor | null;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: number;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: number;
}