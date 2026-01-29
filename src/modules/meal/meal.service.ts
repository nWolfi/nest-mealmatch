import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { Meal } from './entities/meal.entity';
import { Ingredient } from '../ingredient/entities/ingredient.entity';

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

  async getRandomMeal(excludeIds: string[]): Promise<Meal | null> {
    const allMeals = await this.mealRepository.find();
    const availableMeals = allMeals.filter(
      (meal) => !excludeIds.includes(meal.id),
    );
    if (availableMeals.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * availableMeals.length);
    return availableMeals[randomIndex];
  }
}
