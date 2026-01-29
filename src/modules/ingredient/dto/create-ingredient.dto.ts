import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateIngredientDto {
  @ApiProperty({
    description: 'Ingredient name',
    example: 'Tomato',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Ingredient weight in grams',
    example: 100,
    type: 'number',
  })
  @IsNotEmpty()
  @IsNumber()
  gram: number;

  @ApiProperty({
    description: 'Ingredient calories per gram',
    example: 18,
    required: false,
    type: 'number',
  })
  @IsOptional()
  @IsNumber()
  caloriesPerGram?: number;
}
