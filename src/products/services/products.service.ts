import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { NotFoundException, Injectable } from '@nestjs/common';
import { CreateProductsDto, UpdateProductsDto } from '../dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';
import { FilterQueryDto } from '../dtos/filter.dto';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  findAll(query: FilterQueryDto) {
    if (!query) {
      const products = this.productModel.find().exec();
      return products;
    }

    const filters: FilterQuery<Product> = {};

    const { limit, offset, minPrice, maxPrice } = query;

    if (minPrice && maxPrice) {
      filters.price = { $gte: minPrice, $lte: maxPrice };
    }

    const filteredProducts = this.productModel
      .find(filters)
      .populate('brand')
      .skip(offset)
      .limit(limit)
      .exec();
    return filteredProducts;
  }

  async findOne(id: string) {
    const product = await this.productModel
      .findById(id)
      .populate('brand')
      .exec();

    if (!product) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }

    return product;
  }

  async create(payload: CreateProductsDto) {
    const newProduct = await this.productModel.create(payload);
    return newProduct;
  }

  async update(id: string, payload: UpdateProductsDto) {
    const product = await this.productModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();

    if (!product) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }

    return product;
  }

  async delete(id: string) {
    const product = await this.productModel.findByIdAndDelete(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }
    return product;
  }
}
