import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  async login(loginDto: LoginDto): Promise<{ success: boolean; user?: User }> {
    const user = await this.userRepository.findOneBy({ email: loginDto.email });
    if (!user) {
      return { success: false };
    }
    const isPasswordValid = await argon2.verify(
      user.passwordHash,
      loginDto.password,
    );
    if (isPasswordValid) {
      return { success: true, user };
    }
    return { success: false };
  }
}
