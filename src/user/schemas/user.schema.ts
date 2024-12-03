import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaType, SchemaTypes } from 'mongoose';


@Schema()
export class Permission extends Document {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ required: true, })
  action: string;
  @Prop({ required: true, })
  subject: string;
  
}

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: false })
  phoneNumber?: string;

  @Prop({ required: false })
  age?: number;
  @Prop({ required: true,type:[Permission] })
  permissions: Permission[] ;
}

export const UserSchema = SchemaFactory.createForClass(User);
