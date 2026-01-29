import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { Meal } from './entities/meal.entity';

@ApiTags('Meal')
@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new meal' })
  @ApiBody({ type: CreateMealDto })
  @ApiResponse({ status: 201, description: 'Meal created', type: Meal })
  create(@Body() createMealDto: CreateMealDto) {
    return this.mealService.create(createMealDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all meals' })
  @ApiResponse({ status: 200, description: 'List of meals', type: [Meal] })
  findAll() {
    return this.mealService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a meal by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Meal ID' })
  @ApiResponse({ status: 200, description: 'Meal found', type: Meal })
  @ApiResponse({ status: 404, description: 'Meal not found' })
  findOne(@Param('id') id: string) {
    return this.mealService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a meal' })
  @ApiParam({ name: 'id', type: String, description: 'Meal ID' })
  @ApiBody({ type: UpdateMealDto })
  @ApiResponse({ status: 200, description: 'Meal updated', type: Meal })
  @ApiResponse({ status: 404, description: 'Meal not found' })
  update(@Param('id') id: string, @Body() updateMealDto: UpdateMealDto) {
    return this.mealService.update(id, updateMealDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a meal' })
  @ApiParam({ name: 'id', type: String, description: 'Meal ID' })
  @ApiResponse({ status: 200, description: 'Meal deleted' })
  @ApiResponse({ status: 404, description: 'Meal not found' })
  remove(@Param('id') id: string) {
    return this.mealService.remove(id);
  }

  @Get('/random')
  @ApiOperation({ summary: 'Get a random meal, excluding specified IDs' })
  @ApiQuery({ name: 'excludeIds', type: [String], required: false, description: 'Array of meal IDs to exclude' })
  @ApiResponse({ status: 200, description: 'Random meal', type: Meal })
  @ApiResponse({ status: 404, description: 'No meals available' })
  getRandomMeal(@Query('excludeIds') excludeIds: string[]) {
    return this.mealService.getRandomMeal(excludeIds || []);
  }
}
