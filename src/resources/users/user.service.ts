import { createHashFromPassword } from 'utils/auth';
import * as repository from './user.repository';
import { IUser } from './user.model';

/**
 * Get all users
 * @returns Array of all users
 */
export const getAll = async (): Promise<IUser[]> => repository.getAll();

/**
 * Get user by ID
 * @param userId - ID of an user
 * @returns Object with a particular user data
 */
export const getById = async (userId: string): Promise<IUser | undefined> => repository.getById(userId);

/**
 * Get user by login
 * @param login - login of an user
 * @returns Object with a particular user data
 */
 export const getByLogin = async (login: string): Promise<IUser | undefined> => repository.getByLogin(login);

/**
 * Create a new user
 * @param user - User data
 * @returns New user data
 */
export const create = async (user: IUser): Promise<IUser> => repository.create(user);

/**
 * Update existing user or create new
 * @param userId - ID of an user
 * @param data - User data for updating
 * @returns Updated user data
 */
export const update = async (userId: string, data: Partial<IUser & { password?: string }>): Promise<IUser> => {
  const { password, ...userData } = data;

  if (password) {
    userData.passwordHash = createHashFromPassword(password);
  }

  return repository.update(userId, userData);
}

/**
 * Remove an user
 * @param userId - ID of an user
 * @returns User was removed
 */
export const remove = async (userId: string): Promise<boolean> => repository.remove(userId);
