import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Product } from 'src/products/entities/product.entity';
import { Users } from './user.entity';

@Schema()
export class Orders extends Document {
  @Prop({ type: Types.ObjectId, ref: Users.name, required: true })
  user: Users | Types.ObjectId;

  @Prop({ type: Date })
  date: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }] })
  products: Types.Array<Product>;
}

export const OrdersSchema = SchemaFactory.createForClass(Orders);
