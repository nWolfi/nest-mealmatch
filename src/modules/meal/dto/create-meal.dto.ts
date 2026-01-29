export class CreateMealDto {
  name: string;
  image?: Buffer;
  ingredientIds?: string[];
}
