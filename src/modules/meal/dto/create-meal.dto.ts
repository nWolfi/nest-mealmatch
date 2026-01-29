import { ApiProperty } from '@nestjs/swagger';
import { CreateIngredientDto } from '../../ingredient/dto/create-ingredient.dto';

export class CreateMealDto {
  @ApiProperty({ description: 'Meal name', example: 'Spaghetti Bolognese' })
  name: string;

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
