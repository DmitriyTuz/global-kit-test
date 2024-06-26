import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";

const configService = new ConfigService();

async function start() {

  const PORT = configService.get('PORT') || 5000;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
start();