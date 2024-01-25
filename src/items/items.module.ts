import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './items.entity';
import { User } from 'src/users/users.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item, User]),
    AuthModule,
    JwtModule
  ],
  controllers: [ItemsController],
  providers: [ItemsService]
})
export class ItemsModule {}
