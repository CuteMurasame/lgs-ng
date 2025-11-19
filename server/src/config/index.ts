import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface Config {
    port: number;
    env: string;
    db: {
        host: string;
        user: string;
        port: number;
        password: string;
        database: string;
    };
    redis: {
        host: string;
        port: number;
        password: string;
        keyPrefix: string;
    };
}

export const config: Config = {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    env: process.env.NODE_ENV || 'development',
    db: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'mydatabase',
    },
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
        password: process.env.REDIS_PASSWORD || '',
        keyPrefix: process.env.REDIS_KEY_PREFIX || '',
    },
}