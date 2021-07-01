import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { SECRET } from '../common/config';

type JWTToken = {
  userId: string;
  login: string;
}

export const verifySessionToken = async (sessionToken: string) => new Promise<JWTToken>((resolve, reject) => {
  jwt.verify(sessionToken.replace('Bearer ', ''), SECRET!, (err, decoded) => {
    if (err || !decoded) {
      return reject();
    }

    return resolve(decoded as JWTToken);
  });
})

export const createSessionToken = async (data: JWTToken) => jwt.sign(data, SECRET!, { expiresIn: 60 * 60 * 24 })

export const createHashFromPassword = (password: string): string => bcrypt.hashSync(password, 10)

export const comparePassword = async (password: string, passwordHash: string): Promise<boolean> => bcrypt.compare(password, passwordHash)
