import { IUser } from 'resources/users/user.model'
import * as usersService from 'resources/users/user.service';
import { comparePassword } from 'utils/auth';

type ErrorCode = 'PASSWORD_DONT_MATCH' | 'USER_NOT_FOUND'

export const tryAuthorize = async (login: string, password: string): Promise<IUser | ErrorCode> => {
  const user = await usersService.getByLogin(login)
  if (!user) {
    return 'USER_NOT_FOUND'
  }

  const passwordMatched = await comparePassword(password, user.passwordHash)
  if (!passwordMatched) {
    return 'PASSWORD_DONT_MATCH'
  }

  return user
}
