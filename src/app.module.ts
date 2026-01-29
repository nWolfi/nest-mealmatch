import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IngredientModule } from './modules/ingredient/ingredient.module';
import { MealModule } from './modules/meal/meal.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5437,
      username: 'postgres',
      password: 'postgres', // Ändere dies zu deinem tatsächlichen Passwort
      database: 'mealmatch',
      entities: [],
      autoLoadEntities: true,
      synchronize: true, // Aktiviert automatische Synchronisation
    }),
    UserModule,
    IngredientModule,
    MealModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
