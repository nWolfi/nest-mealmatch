import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Ingredient } from './ingredient.entity';

@Entity()
export class Nutrition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // z.B. 'calories', 'protein', etc.

  @Column('float')
  value: number;

  @Column()
  unit: string; // z.B. 'g', 'kcal'

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.nutritions)
  ingredient: Ingredient;
}
