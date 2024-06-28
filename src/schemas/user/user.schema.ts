import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  @ApiProperty({ example: 'FirstName1', description: 'User first name' })
  firstName: string;

  @Prop()
  @ApiProperty({ example: 'LastName1', description: 'User last name' })
  lastName: string;

  @Prop({ required: true, unique: true })
  @ApiProperty({ example: 'email@gmail.com', description: 'User email' })
  email: string;

  @Prop()
  @ApiProperty({ example: '11111', description: 'User password' })
  password: string;

  @Prop()
  @ApiProperty({ example: 'ADMIN', description: 'User role' })
  type: string;

}

export const UserSchema = SchemaFactory.createForClass(User);