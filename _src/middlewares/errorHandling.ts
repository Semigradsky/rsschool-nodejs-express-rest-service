import { Request, Response, NextFunction } from 'express';
import { errorLog } from 'logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandling = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  errorLog(err.message, err);
  res.status(500).send('Internal server error');
}

export default errorHandling;
