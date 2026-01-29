import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserCollectionDto {
  @ApiProperty({ description: 'Collection name', example: 'My Favorite Meals' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
