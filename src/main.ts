import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import { JwtStrategy } from '@src/auth/strategies/jwt.strategy';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {Logger} from "@nestjs/common";

const configService = new ConfigService();

async function start() {

  const PORT = configService.get('PORT') || 5000;
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.use(passport.initialize());

  const jwtStrategy = app.get(JwtStrategy);
  passport.use(jwtStrategy);

  const config = new DocumentBuilder()
      .setTitle('Global-Kit-test')
      .setDescription('Documentation REST API')
      .setVersion('0.0.1')
      .addTag('D_TUZ')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  const logger = new Logger();
  await app.listen(PORT, () => logger.log(`Application starting ...`));
}
start();