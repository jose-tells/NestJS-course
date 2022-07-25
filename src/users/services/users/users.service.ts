import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { Db } from 'mongodb';

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsersDto, UpdateUsersDto } from 'src/users/dtos/users.dto';
import { Users } from 'src/users/entities/user.entity';
import { ProductsService } from 'src/products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    @InjectModel(Users.name) private usersModel: Model<Users>,
  ) {}
  findAll() {
    return this.usersModel.find().exec();
  }

  async findOne(id: string) {
    const user = await this.usersModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    return user;
  }

  async create(payload: CreateUsersDto) {
    const userCreated = await this.usersModel.create(payload);

    return userCreated;
  }

  async update(id: string, payload: UpdateUsersDto) {
    const userUpdated = await this.usersModel
      .findByIdAndUpdate(id, { $set: payload, new: true })
      .exec();

    if (!userUpdated) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    return userUpdated;
  }

  async delete(id: string) {
    const userDeleted = await this.usersModel.findByIdAndDelete(id).exec();

    if (!userDeleted) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    return userDeleted;
  }

  // getOrdersByUser(id: number) {
  //   const user = this.findOne(id);

  //   return {
  //     date: new Date(),
  //     products: this.productsService.findAll(),
  //     user,
  //   };
  // }
}
