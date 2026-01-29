import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateNutritionDto {
  @ApiProperty({ description: 'Nutrition name', example: 'Protein' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Nutrition value', example: 10.5 })
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @ApiProperty({ description: 'Nutrition unit', example: 'g' })
  @IsNotEmpty()
  @IsString()
  unit: string;

  @ApiProperty({ description: 'Ingredient ID', example: 'uuid-string' })
  @IsNotEmpty()
  @IsUUID()
  ingredientId: string;
}
