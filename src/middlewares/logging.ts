import { Request, Response, NextFunction } from 'express';
import { log } from 'logger';
import { finished } from 'stream';

const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { method, url, body, params, query } = req;
  const start = process.hrtime.bigint();

  next();

  finished(res, () => {
    const ms = process.hrtime.bigint() - start;
    const { statusCode } = res;
    log(`${method} ${url} ${statusCode} [${ms / 1000000n}ms]`, {
      method,
      url,
      params,
      query,
      body,
      statusCode,
    });
  });
}

export default loggingMiddleware;
