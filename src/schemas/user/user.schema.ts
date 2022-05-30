import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/Decorator/roles.decorator';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true
  })
  username: string;

  @Prop()
  password: string;

  @Prop({ default: null })
  token: string;

  @Prop({ default: [Role.User] })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);

