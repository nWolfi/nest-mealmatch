import { ApiProperty } from '@nestjs/swagger';

export class CreateIngredientDto {
  @ApiProperty({ description: 'Ingredient name', example: 'Tomato' })
  name: string;
}
