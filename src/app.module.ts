import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthController } from './auth/auth.controller'
import { AuthModule } from './auth/auth.module'
import { ItemsController } from './items/items.controller'
import { ItemsModule } from './items/items.module'
import { TokenPayloadMiddleware } from './items/token-payload.middleware'
import { config } from './ormconfig'
import { UsersModule } from './users/users.module'

@Module({
  controllers: [AuthController],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(config),
    UsersModule,
    ItemsModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  // constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenPayloadMiddleware).forRoutes(ItemsController)
  }
}
