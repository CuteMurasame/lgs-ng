import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import { config } from "./config";
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const AppDataSource = new DataSource({
    type: "mariadb",
    host: config.db.host,
    port: config.db.port,
    username: config.db.user,
    password: config.db.password,
    database: config.db.database,

    synchronize: false,
    logging: false,

    entities: [path.join(__dirname, "/entities/*.ts")],
    namingStrategy: new SnakeNamingStrategy(),

    subscribers: [],
    migrations: [],
});