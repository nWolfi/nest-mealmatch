import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { Meal } from './entities/meal.entity';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { MealDto } from './dto/meal.dto';

@Injectable()
export class MealService {
  constructor(
    @InjectRepository(Meal)
    private readonly mealRepository: Repository<Meal>,
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async create(createMealDto: CreateMealDto): Promise<Meal> {
    const { ingredients, ...mealData } = createMealDto;
    const meal = this.mealRepository.create(mealData);

    if (ingredients && ingredients.length > 0) {
      const createdIngredients =
        await this.ingredientRepository.save(ingredients);
      meal.ingredients = createdIngredients;
    }

    return this.mealRepository.save(meal);
  }

  async findAll(): Promise<Meal[]> {
    return this.mealRepository.find();
  }

  async findOne(id: string): Promise<Meal | null> {
    return this.mealRepository.findOneBy({ id });
  }

  async update(id: string, updateMealDto: UpdateMealDto): Promise<Meal> {
    const { ingredients, ...mealData } = updateMealDto;
    await this.mealRepository.update(id, mealData);

    if (ingredients && ingredients.length > 0) {
      const createdIngredients =
        await this.ingredientRepository.save(ingredients);
      await this.mealRepository.update(id, { ingredients: createdIngredients });
    }

    const updatedMeal = await this.mealRepository.findOneBy({ id });
    if (!updatedMeal) {
      throw new Error('Meal not found');
    }
    return updatedMeal;
  }

  async remove(id: string): Promise<void> {
    await this.mealRepository.delete(id);
  }

  async getRandom(): Promise<MealDto> {
    const meals = await this.mealRepository.find();
    if (meals.length === 0) {
      throw new Error('No meals found');
    }
   const randomMeal = meals[Math.floor(Math.random() * meals.length)];

   const mealDto: MealDto = {
     id: randomMeal.id,
     name: randomMeal.name,
     description: '', // Assuming description is not stored in the Meal entity
     image: randomMeal.image
       ? randomMeal.image.toString('base64')
       : null
   };

   return mealDto;
  }

}
