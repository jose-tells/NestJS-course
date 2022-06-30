import { Controller, Get, Param } from '@nestjs/common';

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
