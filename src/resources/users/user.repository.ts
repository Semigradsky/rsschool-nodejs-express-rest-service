import { getConnection } from 'db';
import User, { IUser } from './user.model';

const repository = getConnection()!.getRepository(User);

/**
 * Get all users
 * @returns Array of all users
 */
export const getAll = async () => repository.find()

/**
 * Get user by ID
 * @param userId - ID of an user
 * @returns Object with a particular user data
 */
export const getById = async (userId: string) => repository.findOne(userId)

/**
 * Create a new user
 * @param user - User data
 * @returns New user data
 */
export const create = async (user: IUser) => repository.save(user)

/**
 * Update existing user or create new
 * @param userId - ID of an user
 * @param data - User data for updating
 * @returns Updated user data
 */
export const update = async (userId: string, data: Partial<IUser>) => {
  await repository.update(userId, data)
  const user = await getById(userId)
  return user!
}

/**
 * Remove an user
 * @param userId - ID of an user
 * @returns User was removed
 */
export const remove = async (userId: string) => {
  const res = await repository.delete(userId)
  return !!res.affected
}
