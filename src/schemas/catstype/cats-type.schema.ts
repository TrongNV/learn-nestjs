import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CatsTypeDocument = CatsType & Document;

@Schema()
export class CatsType {
  @Prop()
  name: string;
}

export const CatsTypeSchema = SchemaFactory.createForClass(CatsType);

