import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { Request, Response } from 'express';

@Catch(HttpException)
export class LoggingFilter implements ExceptionFilter {
  private logger = new Logger('Exception');

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request: Request | FastifyRequest = ctx.getRequest();
    const { method, url } = request;
    const statusCode = exception.getStatus();
    this.logger.log(`[${method}] ${url} - ${statusCode}`);

    const response: Response | FastifyReply = ctx.getResponse();
    response
      .status(statusCode)
      .send({
        statusCode,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
