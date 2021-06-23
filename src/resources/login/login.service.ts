import { log } from 'logger'
import { IUser } from 'resources/users/user.model'

type ErrorCode = 'PASSWORD_DONT_MATCH' | 'USER_NOT_FOUND'

export const tryAuthorize = async (login: string, password: string): Promise<IUser | ErrorCode> => {
  // TODO:
  // 1. Find user by login
  // 2. Compare `password` with `passwordHash`
  // 3. Return user if auhorized
  //    or return ErrorCode
  log('[tryAuthorize]', { login, password })

  return 'USER_NOT_FOUND'
}
