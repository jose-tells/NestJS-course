import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

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
  Query,
  // ParseIntPipe,
} from '@nestjs/common';
import { CreateProductsDto, UpdateProductsDto } from '../dtos/products.dto';
import { FilterQueryDto } from '../dtos/filter.dto';
import { ProductsService } from '../services/products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getProducts(@Query() query: FilterQueryDto) {
    const products = await this.productsService.findAll(query);
    return {
      message: 'Products Listed',
      body: products,
    };
  }

  @Get(':id')
  async getProductById(@Param('id', MongoIdPipe) id: string) {
    const product = await this.productsService.findOne(id);
    return {
      message: `Product listed with id: ${id}`,
      body: product,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() payload: CreateProductsDto) {
    const productCreated = await this.productsService.create(payload);

    return {
      message: `Product created with id: ${productCreated._id}`,
      body: productCreated,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async updateProduct(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductsDto,
  ) {
    const productUpdated = await this.productsService.update(id, payload);
    return {
      message: `Updated file with id: ${id}`,
      body: productUpdated,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteProduct(@Param('id', MongoIdPipe) id: string) {
    const productDeleted = await this.productsService.delete(id);

    return {
      message: `Successfully deleted product with id: ${productDeleted._id}`,
      body: productDeleted,
    };
  }
}
