import * as boardService from 'resources/boards/board.service';
import * as taskService from 'resources/tasks/task.service';

import repository from './user.memory.repository';
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
 * Create a new user
 * @param user - User data
 * @returns New user data
 */
export const create = async (user: IUser): Promise<IUser> => repository.create(user.id, user);

/**
 * Update existing user or create new
 * @param userId - ID of an user
 * @param data - User data for updating
 * @returns Updated user data
 */
export const update = async (userId: string, data: Partial<IUser>): Promise<IUser> => repository.update(userId, data);

/**
 * Remove an user
 * @param userId - ID of an user
 */
export const remove = async (userId: string): Promise<void> => {
  await repository.delete(userId);

  const boards = await boardService.getAll();
  const tasks = (
    await Promise.all(boards.map((board) => taskService.getAll(board.id)))
  ).flat();

  const tasksForUpdate = tasks.filter((task) => task.userId === userId);

  await Promise.all(
    tasksForUpdate.map((task) =>
      taskService.update(task.boardId, task.id, { userId: null })
    )
  );
};
