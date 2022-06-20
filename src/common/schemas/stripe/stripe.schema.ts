import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Card } from './card.schema';

export type StripeDocument = Stripe & Document;

@Schema()
export class Stripe {
  @Prop()
  cardId: string;

  @Prop()
  type: string;

  @Prop({
    default: {},
    type: ()=> Card
  })
  card: Card;
}
export const StripeSchema = SchemaFactory.createForClass(Stripe);
