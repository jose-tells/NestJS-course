import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  HttpCode,
  HttpStatus,
  // Res,
  Get,
  // ParseIntPipe,
} from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { CreateProductsDto, UpdateProductsDto } from '../dtos/products.dto';
// import { Response } from 'express';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.findAll();
  }

  @Get(':id')
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createProduct(@Body() payload: CreateProductsDto) {
    const productCreated = this.productsService.create(payload);

    return {
      message: `Product created with id: ${productCreated.id}`,
      body: productCreated,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductsDto,
  ) {
    const productUpdated = this.productsService.update(id, payload);

    return {
      message: `Updating file with id: ${id}`,
      body: productUpdated,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return {
      message: `Successfully deleted product with id: ${id}`,
      body: this.productsService.delete(id),
    };
  }
}
