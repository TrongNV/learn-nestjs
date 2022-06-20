import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';

export type CardDocument = Card & Document;
@Schema()
export class Card{
  @Prop()
  number: string

  @Prop()
  expMonth: number

  @Prop()
  expYear: number

  @Prop()
  cvc: string
}
export const CardSchema = SchemaFactory.createForClass(Card);
