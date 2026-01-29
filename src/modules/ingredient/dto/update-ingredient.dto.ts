import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';
import { CreateIngredientDto } from './create-ingredient.dto';

export class UpdateIngredientDto extends PartialType(CreateIngredientDto) {
  @ApiProperty({
    description: 'Ingredient name (optional)',
    example: 'Cherry Tomato',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Ingredient weight in grams (optional)',
    example: 150,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  gram?: number;

  @ApiProperty({
    description: 'Ingredient calories per gram (optional)',
    example: 20,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  caloriesPerGram?: number;
}
