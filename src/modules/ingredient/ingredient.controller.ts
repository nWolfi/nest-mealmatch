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
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';

@ApiTags('Ingredient')
@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new ingredient' })
  @ApiBody({ type: CreateIngredientDto })
  @ApiResponse({
    status: 201,
    description: 'Ingredient created',
    type: Ingredient,
  })
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientService.create(createIngredientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all ingredients' })
  @ApiResponse({
    status: 200,
    description: 'List of ingredients',
    type: [Ingredient],
  })
  findAll() {
    return this.ingredientService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an ingredient by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Ingredient ID' })
  @ApiResponse({
    status: 200,
    description: 'Ingredient found',
    type: Ingredient,
  })
  @ApiResponse({ status: 404, description: 'Ingredient not found' })
  findOne(@Param('id') id: string) {
    return this.ingredientService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an ingredient' })
  @ApiParam({ name: 'id', type: String, description: 'Ingredient ID' })
  @ApiBody({ type: UpdateIngredientDto })
  @ApiResponse({
    status: 200,
    description: 'Ingredient updated',
    type: Ingredient,
  })
  @ApiResponse({ status: 404, description: 'Ingredient not found' })
  update(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return this.ingredientService.update(id, updateIngredientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an ingredient' })
  @ApiParam({ name: 'id', type: String, description: 'Ingredient ID' })
  @ApiResponse({ status: 200, description: 'Ingredient deleted' })
  @ApiResponse({ status: 404, description: 'Ingredient not found' })
  remove(@Param('id') id: string) {
    return this.ingredientService.remove(id);
  }
}
