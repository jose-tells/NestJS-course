import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import { BrandsController } from './controllers/brands.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { Product, ProductSchema } from './entities/product.entity';
import { BrandsService } from './services/brands.service';
import { Brand, BrandSchema } from './entities/brand.entity';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: Brand.name,
        schema: BrandSchema,
      },
    ]),
  ],
  controllers: [ProductsController, BrandsController, CategoriesController],
  providers: [ProductsService, BrandsService],
  exports: [ProductsService],
})
export class ProductsModule {}
