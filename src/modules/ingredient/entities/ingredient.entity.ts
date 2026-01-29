import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Meal } from '../../meal/entities/meal.entity';
import { Nutrition } from './nutrition.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  gram: number;

  @Column({ nullable: true })
  caloriesPerGram?: number;

  @ManyToMany(() => Meal, (meal) => meal.ingredients)
  meals: Meal[];

  @OneToMany(() => Nutrition, (nutrition) => nutrition.ingredient)
  nutritions: Nutrition[];
}
