import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateUserCollectionDto } from './create-user-collection.dto';

export class UpdateUserCollectionDto extends PartialType(
  CreateUserCollectionDto,
) {
  @ApiProperty({
    description: 'Collection name (optional)',
    example: 'Updated Favorites',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;
}
