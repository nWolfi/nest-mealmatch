import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Ingredient } from '../../ingredient/entities/ingredient.entity';
import { UserCollection } from '../../user/entities/user-collection.entity';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'bytea' })
  image: Buffer;

  @ManyToMany(() => Ingredient, (ingredient) => ingredient.meals, {
    cascade: true,
  })
  @JoinTable()
  ingredients: Ingredient[];

  @ManyToMany(() => UserCollection, (userCollection) => userCollection.meals)
  userCollections: UserCollection[];
}
