import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { Meal } from './entities/meal.entity';
import { Ingredient } from '../ingredient/entities/ingredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meal, Ingredient])],
  controllers: [MealController],
  providers: [MealService],
  exports: [TypeOrmModule],
})
export class MealModule {}
