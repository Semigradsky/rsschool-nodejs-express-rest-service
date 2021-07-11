import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import path from 'path';
import YAML from 'yamljs';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { LoggingFilter } from './logging.filter';
import { LoggingInterceptor } from './logging.interceptor';
import { USE_FASTIFY } from './common/config';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    USE_FASTIFY
      ? new FastifyAdapter()
      : new ExpressAdapter(),
    {
      logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    },
  );

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new LoggingFilter());

  const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
  SwaggerModule.setup('/docs', app, swaggerDocument);

  await app.listen(4000, '0.0.0.0');
}

bootstrap();

process.on('uncaughtException', (error) => {
  new Logger('UncaughtException').error(error.message, error.stack);
});

process.on('unhandledRejection', (_reason, promise) => {
  promise.catch((error) => {
    new Logger('UnhandledRejection').error(error.message, error.stack);
  });
});
