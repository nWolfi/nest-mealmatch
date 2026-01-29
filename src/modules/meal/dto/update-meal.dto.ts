import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateIngredientDto } from '../../ingredient/dto/create-ingredient.dto';
import { CreateMealDto } from './create-meal.dto';

export class UpdateMealDto extends PartialType(CreateMealDto) {
  @ApiProperty({
    description: 'Meal name (optional)',
    example: 'Updated Spaghetti',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Meal image (optional)',
    type: 'string',
    format: 'binary',
    required: false,
  })
  image?: Buffer;

  @ApiProperty({
    description: 'Array of ingredients (optional)',
    type: [CreateIngredientDto],
    required: false,
    example: [{ name: 'Tomato' }, { name: 'Pasta' }],
  })
  ingredients?: CreateIngredientDto[];
}
