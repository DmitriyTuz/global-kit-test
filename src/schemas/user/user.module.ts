import { Module } from '@nestjs/common';
import {UserController} from "@src/schemas/user/user.controller";
import {UserService} from "@src/schemas/user/user.service";
import {User, UserSchema} from "@src/schemas/user/user.schema";
import {MongooseModule} from "@nestjs/mongoose";



@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
  ]
})
export class UserModule {}
