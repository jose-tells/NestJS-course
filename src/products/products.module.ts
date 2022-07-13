import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { BrandsController } from './controllers/brands.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';

@Module({
  imports: [HttpModule],
  controllers: [ProductsController, BrandsController, CategoriesController],
  providers: [
    {
      provide: ProductsService,
      useClass: ProductsService,
    },
    {
      provide: 'TASKS',
      useFactory: async (httpService: HttpService) => {
        const tasks = await httpService.axiosRef.get(
          'https://jsonplaceholder.typicode.com/todos',
        );

        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
