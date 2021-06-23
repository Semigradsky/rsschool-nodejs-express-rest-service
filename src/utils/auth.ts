import jwt from 'jsonwebtoken'
import { SECRET } from 'common/config';

import { IUser } from 'resources/users/user.model';

type JWTToken = {
  userId: string;
  login: string;
}

declare global{
  namespace Express {
      interface Request {
        user: IUser;
      }
  }
}

export const verifySessionToken = async (sessionToken: string) => new Promise<JWTToken>((resolve, reject) => {
  jwt.verify(sessionToken, SECRET!, (err, decoded) => {
    if (err || !decoded) {
      return reject();
    }

    return resolve(decoded as JWTToken);
  });
})
