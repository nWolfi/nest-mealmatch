import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';
import { UserCollection } from './entities/user-collection.entity';
import { TokenPayload } from './models/token-payload.model';
import { Meal } from '../meal/entities/meal.entity';
import { MealDto } from '../meal/dto/meal.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserCollection)
    private readonly userCollectionRepository: Repository<UserCollection>,
    @InjectRepository(Meal)
    private readonly mealRepository: Repository<Meal>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await argon2.hash(createUserDto.password);
    const user = await this.userRepository.save({
      ...createUserDto,
      passwordHash: hashedPassword,
    });
    return user;
  }

  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOneBy({ id });
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ success: boolean; token?: string }> {
    const user = await this.userRepository.findOneBy({ email: loginDto.email });
    if (!user) {
      return { success: false };
    }
    const isPasswordValid = await argon2.verify(
      user.passwordHash,
      loginDto.password,
    );
    if (isPasswordValid) {
      const payload: TokenPayload = {
        email: user.email,
        sub: user.id,
        role: user.role,
      };
      const token = this.jwtService.sign(payload);
      return { success: true, token };
    }
    return { success: false };
  }

  async getCollections(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }

    const collections = await this.userCollectionRepository.find({
      where: { user: user },
      relations: ['meals', 'meals.ingredients'],
    });

    console.log('Collections:', collections[0]);
    return collections[0];
  }

  async addMealToCollection(userId: string, mealId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const meal = await this.mealRepository.findOneBy({ id: mealId });
    if (!meal) {
      throw new Error('Meal not found');
    }

    const collection = await this.userCollectionRepository.find({
      where: { user },
      relations: ['meals'],
    });

    if (!collection || collection.length === 0) {
      const userCollection: UserCollection =
        this.userCollectionRepository.create({
          user,
          name: 'Default',
          meals: [meal],
        });
      return this.userCollectionRepository.save(userCollection);
    }

    if (collection[0].meals.some((m) => m.id === meal.id)) {
      throw new Error('Meal already in collection');
    }

    collection[0].meals.push(meal);
    // console.log('Updated Collection:', collection[0]);

    return this.userCollectionRepository.save(collection[0]);
  }

  async validateToken(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token) as TokenPayload;

    const user = await this.userRepository.findOneBy({ id: decoded.sub });
    if (!user) {
      throw new ForbiddenException('invalid User');
    }
    return user;
  }
}
