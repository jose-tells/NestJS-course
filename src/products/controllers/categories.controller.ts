import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  @Get()
  getCategories() {
    return `Categories page`;
  }

  @Get(':categoryId')
  getCategoriesById(@Param('categoryId') categoryId: string) {
    return `Category with ${categoryId} id`;
  }
}
