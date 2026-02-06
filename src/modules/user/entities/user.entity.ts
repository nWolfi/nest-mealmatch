import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserCollection } from './user-collection.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column({ default: 'user' })
  role: string;

  @OneToMany(() => UserCollection, (userCollection) => userCollection.user)
  userCollections: UserCollection[];
}
