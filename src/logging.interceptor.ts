import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import type { FastifyRequest } from 'fastify';
import type { Request } from 'express'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger('HTTP');

  intercept(context: ExecutionContext, stream$: CallHandler): Observable<any> {
    const req: Request | FastifyRequest = context.switchToHttp().getRequest();
    const { method, url, body, params, query } = req;
    const start = process.hrtime.bigint();

    return stream$
      .handle()
      .pipe(tap(data => {
        const ms = process.hrtime.bigint() - start;
        const { statusCode } = context.switchToHttp().getResponse();

        this.logger.log(`[${method}] ${url} ${JSON.stringify(params)} - ${statusCode} [${ms / 1000000n}ms] ${JSON.stringify(data)}`);
        if (body && Object.keys(body).length > 0) {
          this.logger.log(`- body: ${JSON.stringify(body)}`);
        }
        if (query && typeof query === 'object' && Object.keys(query).length > 0) {
          this.logger.log(`- query: ${JSON.stringify(query)}`);
        }
        return data
      }));
  }
}
