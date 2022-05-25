import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Mongoose, ObjectId } from 'mongoose';
import { Gender } from 'src/Dtos';

export type CatDocument = Cat & Document;

@Schema()
export class Cat {
  @Prop()
  name: string;

  @Prop()
  urlImage: string;

  @Prop()
  gender: Gender

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CatsType'
  })
  catsTypeId: ObjectId
}

export const CatSchema = SchemaFactory.createForClass(Cat);