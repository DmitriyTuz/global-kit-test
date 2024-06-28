import { Module } from '@nestjs/common';
import { AuthController } from '@src/auth/auth.controller';
import { AuthService } from '@src/auth/auth.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "@src/schemas/user/user.schema";
import {JwtStrategy} from "@src/auth/strategies/jwt.strategy";
import {UserModule} from "@src/schemas/user/user.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    UserModule,
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    JwtModule.register({
    }),
  ]
})
export class AuthModule {}
