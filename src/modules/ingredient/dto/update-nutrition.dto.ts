import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString, IsUUID } from 'class-validator';
import { CreateNutritionDto } from './create-nutrition.dto';

export class UpdateNutritionDto extends PartialType(CreateNutritionDto) {
  @ApiProperty({
    description: 'Nutrition name (optional)',
    example: 'Carbs',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Nutrition value (optional)',
    example: 15.2,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  value?: number;

  @ApiProperty({
    description: 'Nutrition unit (optional)',
    example: 'kcal',
    required: false,
  })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiProperty({
    description: 'Ingredient ID (optional)',
    example: 'uuid-string',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  ingredientId?: string;
}
