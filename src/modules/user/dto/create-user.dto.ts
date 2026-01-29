import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', example: 'securepassword123' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
