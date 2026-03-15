import { Ingredient } from '../../ingredient/entities/ingredient.entity';

export class MealDto {
  id: string;
  name: string;
  description: string;
  image: string | null; // Base64 encoded image or null if no image
  ingredients?: Ingredient[];
}
