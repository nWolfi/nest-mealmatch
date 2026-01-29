import { ApiProperty } from '@nestjs/swagger';

export class CreateUserCollectionDto {
  @ApiProperty({ description: 'Collection name', example: 'My Favorite Meals' })
  name: string;
}
