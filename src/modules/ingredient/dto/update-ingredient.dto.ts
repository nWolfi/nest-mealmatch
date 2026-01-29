import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateIngredientDto } from './create-ingredient.dto';

export class UpdateIngredientDto extends PartialType(CreateIngredientDto) {
  @ApiProperty({
    description: 'Ingredient name (optional)',
    example: 'Cherry Tomato',
    required: false,
  })
  name?: string;
}
