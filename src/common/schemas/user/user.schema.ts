import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Role } from 'src/common/decorator/roles.decorator';

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  username: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({ default: [] })
  cards: ObjectId[];

  @Prop({ default: "" })
  customerId: string

  @Prop({ default: "" })
  subId: string

  @Prop()
  password: string;

  @Prop({ default: null })
  token: string;

  @Prop({ default: [Role.User] })
  roles: Role[];
}
export const UserSchema = SchemaFactory.createForClass(User);
