import { Request, Response, NextFunction } from 'express';
import { verifySessionToken } from 'utils/auth';
import * as userService from 'resources/users/user.service'

const validateSession = async (req: Request, res: Response, next: NextFunction) => {
  const sessionToken = req.headers.authorization
  if (!sessionToken) {
    res.status(401).send('Access token is missing or invalid');
    return;
  }

  try {
    const token = await verifySessionToken(sessionToken);
    const user = await userService.getById(token.userId);

    if (!user) {
      res.status(403).send('User not found');
      return
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send('Access token is missing or invalid');
  }
}

export default validateSession
