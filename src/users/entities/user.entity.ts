import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Skills, SkillsSchema } from './skills.entity';

@Schema()
export class Users extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  role: 'admin' | 'client';

  @Prop({
    type: [SkillsSchema],
  })
  skills: Types.Array<Skills>;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
