import { Request, Response, NextFunction, RequestHandler } from 'express';

export const wrapRoute = (fn: RequestHandler) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    // run controllers logic
    await fn(req, res, next)
  } catch (e) {
    // if an exception is raised, do not send any response
    // just continue performing the middleware chain
    next(e)
  }
}
