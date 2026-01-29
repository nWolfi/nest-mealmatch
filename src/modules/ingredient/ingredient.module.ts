import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';
import { Ingredient } from './entities/ingredient.entity';
import { Nutrition } from './entities/nutrition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient, Nutrition])],
  controllers: [IngredientController],
  providers: [IngredientService],
})
export class IngredientModule {}
