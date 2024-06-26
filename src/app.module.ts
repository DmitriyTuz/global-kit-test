import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";

const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(configService.get('MONGODB_URL')),
    // AuthModule,
    // UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
