import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
  ApiConsumes,
} from '@nestjs/swagger';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { Meal } from './entities/meal.entity';
import { MealDto } from './dto/meal.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { log } from 'console';

@ApiTags('Meal')
@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new meal with image upload (multipart)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        meal: { type: 'string', description: 'JSON string of CreateMealDto' },
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Meal created', type: Meal })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
    }),
  )
  async createWithImage(
    @UploadedFile() image: any,
    @Body('meal') mealString: string,
  ) {
    if (!image) {
      throw new BadRequestException('Image file is required');
    }

    if (!mealString) {
      throw new BadRequestException('Meal data is required');
    }

    let meal: CreateMealDto;
    try {
      const parsed = JSON.parse(mealString);
      meal = plainToInstance(CreateMealDto, parsed);
      const errors = await validate(meal);
      if (errors.length > 0) {
        throw new BadRequestException('Invalid meal data');
      }
    } catch (error) {
      throw new BadRequestException('Invalid JSON in meal data');
    }

    // Add the image buffer to the DTO
    (meal as any).image = image.buffer;

    return this.mealService.create(meal);
  }

  @Get()
  @ApiOperation({ summary: 'Get all meals' })
  @ApiResponse({ status: 200, description: 'List of meals', type: [Meal] })
  findAll() {
    return this.mealService.findAll();
  }

  @Get('/random-meal')
  @ApiOperation({
    summary: 'Test endpoint to check if the controller is working',
  })
  @ApiResponse({ status: 200, description: 'Test successful' })
  randomMeal(): Promise<MealDto> {
    return this.mealService.getRandom();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a meal by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Meal ID' })
  @ApiResponse({ status: 200, description: 'Meal found', type: Meal })
  @ApiResponse({ status: 404, description: 'Meal not found' })
  findOne(@Param('id') id: string): Promise<Meal | null> {
    return this.mealService.findOne(id);
  }
}
