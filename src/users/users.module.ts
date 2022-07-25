import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './entities/user.entity';

import { Module } from '@nestjs/common';
import { CustomersController } from './controllers/customers.controller';
import { OrdersController } from './controllers/orders.controller';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users/users.service';

/** @External imported module to use its exports */
import { ProductsModule } from 'src/products/products.module';
import { OrdersService } from './services/orders/orders.service';
import { Orders, OrdersSchema } from './entities/order.entity';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UsersSchema,
      },
      {
        name: Orders.name,
        schema: OrdersSchema,
      },
    ]),
  ],
  controllers: [UsersController, CustomersController, OrdersController],
  providers: [UsersService, OrdersService],
})
export class UsersModule {}
