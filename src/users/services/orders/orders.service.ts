import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrdersDto, UpdateOrdersDto } from 'src/users/dtos/orders.dto';
import { Orders } from 'src/users/entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Orders.name) private ordersModel: Model<Orders>) {}

  findAll() {
    return this.ordersModel.find().populate(['user', 'products']).exec();
  }

  async findOne(id: string) {
    const order = await this.ordersModel
      .findById(id)
      .populate(['user', 'products'])
      .exec();

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return order;
  }

  async create(payload: CreateOrdersDto) {
    const newOrder = await this.ordersModel.create(payload);
    return newOrder;
  }

  async addProductsToOrder(id: string, payload: string) {
    const order = await this.ordersModel.findById(id);

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    order.products.push(payload);

    return order.save();
  }

  async update(id: string, payload: UpdateOrdersDto) {
    const updatedOrder = await this.ordersModel
      .findByIdAndUpdate(
        id,
        {
          $set: payload,
        },
        { new: true },
      )
      .exec();

    if (!updatedOrder) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return updatedOrder;
  }

  async delete(id: string) {
    const deletedOrder = await this.ordersModel.findByIdAndDelete(id).exec();

    if (!deletedOrder) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return deletedOrder;
  }

  async deleteProduct(id: string, productId: string) {
    const order = await this.ordersModel.findById(id);

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    const productDeleted = order.products.pull(productId);

    if (!productDeleted) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    return order.save();
  }
}
