import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'src/views/partials'));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8080);
}

bootstrap();