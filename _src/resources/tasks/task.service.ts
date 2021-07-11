import * as repository from './task.repository';
import { ITask } from './task.model';

/**
 * Get all tasks
 * @param boardId - ID of a board
 * @returns Array of all tasks
 */
export const getAll = (boardId: string): Promise<ITask[]> => repository.getAll(boardId);

/**
 * Get task by ID
 * @param boardId - ID of a board
 * @param taskId - ID of a task
 * @returns Object with a particular task data
 */
export const getById = (boardId: string, taskId: string): Promise<ITask | undefined> => repository.getById(boardId, taskId);

/**
 * Create a new task
 * @param boardId - ID of a board
 * @param task - Task data
 * @returns New task data
 */
export const create = (task: ITask): Promise<ITask> => repository.create(task);

/**
 * Update existing task or create new
 * @param boardId - ID of a board
 * @param taskId - ID of a task
 * @param data - Task data for updating
 * @returns Updated task data
 */
export const update = (boardId: string, taskId: string, data: Partial<ITask>): Promise<ITask> =>
  repository.update(boardId, taskId, data);

/**
 * Remove a task
 * @param taskId - ID of a task
 * @returns User was removed
 */
export const remove = (taskId: string): Promise<boolean> => repository.remove(taskId);
