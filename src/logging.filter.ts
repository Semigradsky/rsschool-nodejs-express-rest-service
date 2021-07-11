import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import type { Request } from 'express'

@Catch(HttpException)
export class LoggingFilter implements ExceptionFilter {
  private logger = new Logger('Exception');

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req: Request | FastifyRequest = ctx.getRequest();
    const { method, url } = req;
    const statusCode = exception.getStatus();
    this.logger.log(`[${method}] ${url} - ${statusCode}`);

    const response = ctx.getResponse();
    response
      .status(statusCode)
      .json({
        statusCode,
        timestamp: new Date().toISOString(),
        path: req.url,
      });
  }
}
