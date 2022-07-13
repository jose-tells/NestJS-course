import { Module } from '@nestjs/common';
import { CustomersController } from './controllers/customers.controller';
import { OrdersController } from './controllers/orders.controller';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users/users.service';

/** @External imported module to use its exports */
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [UsersController, CustomersController, OrdersController],
  providers: [UsersService],
})
export class UsersModule {}
