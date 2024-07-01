import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {UserModule} from "@src/schemas/user/user.module";
import {AuthModule} from "@src/auth/auth.module";
import { TaskModule } from './schemas/task/task.module';
import { ProjectModule } from './schemas/project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
      }),
      inject: [ConfigService],
    }),
    // MongooseModule.forRoot(configService.get('MONGODB_URL')),
    UserModule,
    AuthModule,
    TaskModule,
    ProjectModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
