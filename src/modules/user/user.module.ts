import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserCollectionService } from './user-collection.service';
import { UserCollectionController } from './user-collection.controller';
import { User } from './entities/user.entity';
import { UserCollection } from './entities/user-collection.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserCollection]),
    JwtModule.register({
      secret: 'your-secret-key', // In Produktion aus ENV laden
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController, UserCollectionController],
  providers: [UserService, UserCollectionService],
})
export class UserModule {}
