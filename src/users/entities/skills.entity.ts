import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Skills extends Document {
  @Prop()
  name: string;

  @Prop()
  color: string;
}

export const SkillsSchema = SchemaFactory.createForClass(Skills);
