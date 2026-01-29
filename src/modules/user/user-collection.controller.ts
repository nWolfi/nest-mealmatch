import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UserCollectionService } from './user-collection.service';
import { CreateUserCollectionDto } from './dto/create-user-collection.dto';
import { UpdateUserCollectionDto } from './dto/update-user-collection.dto';
import { UserCollection } from './entities/user-collection.entity';

@ApiTags('User Collection')
@Controller('user-collection')
export class UserCollectionController {
  constructor(private readonly userCollectionService: UserCollectionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user collection' })
  @ApiBody({ type: CreateUserCollectionDto })
  @ApiResponse({
    status: 201,
    description: 'User collection created',
    type: UserCollection,
  })
  create(@Body() createUserCollectionDto: CreateUserCollectionDto) {
    return this.userCollectionService.create(createUserCollectionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user collections' })
  @ApiResponse({
    status: 200,
    description: 'List of user collections',
    type: [UserCollection],
  })
  findAll() {
    return this.userCollectionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user collection by ID' })
  @ApiParam({ name: 'id', type: String, description: 'User collection ID' })
  @ApiResponse({
    status: 200,
    description: 'User collection found',
    type: UserCollection,
  })
  @ApiResponse({ status: 404, description: 'User collection not found' })
  findOne(@Param('id') id: string) {
    return this.userCollectionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user collection' })
  @ApiParam({ name: 'id', type: String, description: 'User collection ID' })
  @ApiBody({ type: UpdateUserCollectionDto })
  @ApiResponse({
    status: 200,
    description: 'User collection updated',
    type: UserCollection,
  })
  @ApiResponse({ status: 404, description: 'User collection not found' })
  update(
    @Param('id') id: string,
    @Body() updateUserCollectionDto: UpdateUserCollectionDto,
  ) {
    return this.userCollectionService.update(id, updateUserCollectionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user collection' })
  @ApiParam({ name: 'id', type: String, description: 'User collection ID' })
  @ApiResponse({ status: 200, description: 'User collection deleted' })
  @ApiResponse({ status: 404, description: 'User collection not found' })
  remove(@Param('id') id: string) {
    return this.userCollectionService.remove(id);
  }
}
