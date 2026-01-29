import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IngredientModule } from './modules/ingredient/ingredient.module';
import { MealModule } from './modules/meal/meal.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    UserModule,
    IngredientModule,
    MealModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
