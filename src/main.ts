import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import path from 'path';
import YAML from 'yamljs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });

  app.useGlobalPipes(new ValidationPipe());

  const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
  SwaggerModule.setup('/docs', app, swaggerDocument);

  await app.listen(4000);
}

bootstrap();
