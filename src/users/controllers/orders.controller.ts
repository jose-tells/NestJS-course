import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrdersService } from '../services/orders/orders.service';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import {
  CreateOrdersDto,
  UpdateOrdersDto,
  UpdateProductsFromOrderDto,
} from '../dtos/orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  async getOrders() {
    const orders = await this.ordersService.findAll();

    return {
      message: `Orders listed`,
      body: orders,
    };
  }

  @Get(':id')
  async getOrder(@Param('id', MongoIdPipe) id: string) {
    const order = await this.ordersService.findOne(id);

    return {
      message: `Order listed with id: ${id}`,
      body: order,
    };
  }

  @Post()
  async createOrder(@Body() payload: CreateOrdersDto) {
    const orderCreated = await this.ordersService.create(payload);

    return {
      message: `Order created with id: ${orderCreated._id}`,
      body: orderCreated,
    };
  }

  @Put(':id')
  async updateOrder(
    @Param(':id', MongoIdPipe) id: string,
    @Body() payload: UpdateOrdersDto,
  ) {
    const orderUpdated = await this.ordersService.update(id, payload);

    return {
      message: `Order updated with id: ${orderUpdated._id}`,
      body: orderUpdated,
    };
  }

  @Delete(':id')
  async deleteOrder(@Param('id', MongoIdPipe) id: string) {
    const deletedOrder = await this.ordersService.delete(id);

    return {
      message: `Order deleted with id: ${id}`,
      body: deletedOrder,
    };
  }

  @Delete(':id/products/:productId')
  async deleteOrderProduct(
    @Param('id', MongoIdPipe) id: string,
    @Param('productId', MongoIdPipe) productId: string,
  ) {
    const deletedOrderProduct = await this.ordersService.deleteProduct(
      id,
      productId,
    );

    return {
      message: `Product with id: ${productId} deleted from order #${id}`,
      body: deletedOrderProduct,
    };
  }

  @Put(':id/products')
  async addProduct(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductsFromOrderDto,
  ) {
    const orderUpdated = await this.ordersService.addProductsToOrder(
      id,
      payload.productId,
    );

    return {
      message: `Product with id: ${payload.productId} added to order #${id}`,
      body: orderUpdated,
    };
  }
}
