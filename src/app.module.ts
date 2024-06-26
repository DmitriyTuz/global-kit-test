import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {UserModule} from "@src/schemas/user/user.module";

const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(configService.get('MONGODB_URL')),
    UserModule,
    // AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
