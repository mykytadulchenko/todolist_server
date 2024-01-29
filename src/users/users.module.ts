import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Item } from 'src/items/items.entity'
import { UsersController } from './users.controller'
import { User } from './users.entity'
import { UsersService } from './users.service'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([User, Item]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
