import { PartialType } from '@nestjs/mapped-types';
import { CreateUserCollectionDto } from './create-user-collection.dto';

export class UpdateUserCollectionDto extends PartialType(CreateUserCollectionDto) {}
