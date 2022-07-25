import { ApiTags } from '@nestjs/swagger';

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { CreateBrandDto } from '../dtos/brand.dto';
import { BrandsService } from '../services/brands.service';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getBrands() {
    const brands = await this.brandsService.findAll();

    return {
      message: 'Brands listed',
      body: brands,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getBrandsById(@Param('id', MongoIdPipe) id: string) {
    const brand = await this.brandsService.findOne(id);

    return {
      message: `Brand listed with id: ${id}`,
      body: brand,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBrand(@Body() payload: CreateBrandDto) {
    const brandCreated = await this.brandsService.create(payload);

    return {
      message: `Brand created with id ${brandCreated._id}`,
      body: brandCreated,
    };
  }
}
