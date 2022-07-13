import { NotFoundException, Injectable, Inject } from '@nestjs/common';
import { CreateProductsDto, UpdateProductsDto } from '../dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';
import { ConfigType } from '@nestjs/config';
import config from 'src/utils/config';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  private counterId = 1;

  private products: Product[] = [
    {
      id: 1,
      name: 'Guitar',
      description: 'A musical instrument',
      price: 100,
      stock: 4,
      image: 'google.com',
    },
  ];

  findAll() {
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;
    const dbPort = this.configService.database.dbPort;

    console.log(
      `Database ${dbName} with apiKey: ${apiKey} is running in port ${dbPort}`,
    );
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);

    if (!product) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }

    return product;
  }

  create(payload: CreateProductsDto) {
    this.counterId = this.counterId + 1;

    const newProduct = {
      id: this.counterId,
      ...payload,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  update(id: number, payload: UpdateProductsDto) {
    const product = this.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }

    const index = this.products.findIndex((item) => item.id === id);

    this.products[index] = {
      ...product,
      ...payload,
    };

    return this.products[index];
  }

  delete(id: number) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }

    this.products.splice(index, 1);

    return true;
  }
}
