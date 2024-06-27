import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {UserModule} from "@src/schemas/user/user.module";
import {AuthModule} from "@src/auth/auth.module";
import { TaskModule } from './schemas/task/task.module';
import { ProjectModule } from './schemas/project/project.module';

const configService = new ConfigService();

console.log('process.env.NODE_ENV = ', process.env.NODE_ENV);
console.log('process.env.MONGODB_URL = ', process.env.MONGODB_URL);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(configService.get('MONGODB_URL')),
    UserModule,
    AuthModule,
    TaskModule,
    ProjectModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
