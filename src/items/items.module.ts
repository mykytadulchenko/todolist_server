import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { User } from 'src/users/users.entity'
import { ItemsController } from './items.controller'
import { Item } from './items.entity'
import { ItemsService } from './items.service'

@Module({
  imports: [TypeOrmModule.forFeature([Item, User]), AuthModule],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
