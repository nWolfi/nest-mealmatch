import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserCollectionService } from './user-collection.service';
import { UserCollectionController } from './user-collection.controller';
import { User } from './entities/user.entity';
import { UserCollection } from './entities/user-collection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserCollection])],
  controllers: [UserController, UserCollectionController],
  providers: [UserService, UserCollectionService],
})
export class UserModule {}
