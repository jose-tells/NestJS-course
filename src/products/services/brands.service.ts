import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBrandDto } from '../dtos/brand.dto';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  findAll() {
    return this.brandModel.find().exec();
  }

  async findOne(id: string) {
    const brand = await this.brandModel.findById(id).exec();

    if (!brand) {
      throw new NotFoundException(`Brand with id: ${id} not found`);
    }

    return brand;
  }

  async create(payload: CreateBrandDto) {
    const brandCreated = await this.brandModel.create(payload);

    return brandCreated;
  }
}
