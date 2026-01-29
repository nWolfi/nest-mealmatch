import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateIngredientDto } from '../../ingredient/dto/create-ingredient.dto';

export class CreateMealDto {
  @ApiProperty({ description: 'Meal name', example: 'Spaghetti Bolognese' })
  @IsNotEmpty()
  @IsString()
  name: string;

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
