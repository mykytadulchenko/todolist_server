import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { User } from "./users/users.entity";
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { Item } from "./items/items.entity";
import { Jwt } from "./auth/auth.entity";
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
    controllers: [AuthController],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [User, Item, Jwt],
            synchronize: true
        }),
        UsersModule,
        ItemsModule,
        AuthModule,
    ]
})

export class AppModule {
    constructor(private dataSource: DataSource) {}
}