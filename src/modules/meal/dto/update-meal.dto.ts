import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateIngredientDto } from '../../ingredient/dto/create-ingredient.dto';
import { CreateMealDto } from './create-meal.dto';

export class UpdateMealDto extends PartialType(CreateMealDto) {
  @ApiProperty({
    description: 'Meal name (optional)',
    example: 'Updated Spaghetti',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Meal image (optional)',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  image?: Buffer;

  @ApiProperty({
    description: 'Array of ingredients (optional)',
    type: [CreateIngredientDto],
    required: false,
    example: [{ name: 'Tomato' }, { name: 'Pasta' }],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateIngredientDto)
  ingredients?: CreateIngredientDto[];
}
