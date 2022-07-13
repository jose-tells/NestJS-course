import { Product } from 'src/products/entities/product.entity';
import { Users } from './user.entity';

export class Orders {
  user: Users;
  products: Product[];
  date: Date;
}
