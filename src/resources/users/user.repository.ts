import { getConnection } from 'db';
import { lazy } from 'utils/lazy';
import User, { IUser } from './user.model';

const getRepository = lazy(() => getConnection()!.getRepository(User))

/**
 * Get all users
 * @returns Array of all users
 */
export const getAll = async () => getRepository().find()

/**
 * Get user by ID
 * @param userId - ID of an user
 * @returns Object with a particular user data
 */
export const getById = async (userId: string) => getRepository().findOne(userId)

/**
 * Get user by login
 * @param login - login of an user
 * @returns Object with a particular user data
 */
 export const getByLogin = async (login: string) => getRepository().findOne({ where: { login } })

/**
 * Create a new user
 * @param user - User data
 * @returns New user data
 */
export const create = async (user: IUser) => getRepository().save(user)

/**
 * Update existing user or create new
 * @param userId - ID of an user
 * @param data - User data for updating
 * @returns Updated user data
 */
export const update = async (userId: string, data: Partial<IUser>) => {
  await getRepository().update(userId, data)
  const user = await getById(userId)
  return user!
}

/**
 * Remove an user
 * @param userId - ID of an user
 * @returns User was removed
 */
export const remove = async (userId: string) => {
  const res = await getRepository().delete(userId)
  return !!res.affected
}
