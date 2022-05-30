import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/Decorator/roles.decorator';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  token: string;

  @Prop()
  roles: Role[]; 
}

export const UserSchema = SchemaFactory.createForClass(User);

