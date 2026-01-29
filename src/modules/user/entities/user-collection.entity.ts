import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Meal } from '../../meal/entities/meal.entity';

@Entity()
export class UserCollection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // Angenommen, eine Collection hat einen Namen

  @ManyToOne(() => User, (user) => user.userCollections)
  user: User;

  @ManyToMany(() => Meal, (meal) => meal.userCollections, {
    cascade: true,
  })
  @JoinTable()
  meals: Meal[];
}
