import { getConnection } from 'db';
import Task, { ITask } from './task.model';

const repository = getConnection()!.getRepository(Task);

/**
 * Get all tasks
 * @param boardId - ID of a board
 * @returns Array of all tasks
 */
export const getAll = async (boardId: string): Promise<ITask[]> => repository.find({ where: { boardId } })

/**
 * Get task by ID
 * @param boardId - ID of a board
 * @param taskId - ID of a task
 * @returns Object with a particular task data
 */
export const getById = async (boardId: string, taskId: string): Promise<ITask | undefined> => repository.findOne(taskId, { where: { boardId } })

/**
 * Create a new task
 * @param item - Task data
 * @returns New task data
 */
export const create = async (item: ITask): Promise<ITask> => repository.save(item)

/**
 * Update existing task or create new
 * @param boardId - ID of a board
 * @param taskId - ID of a task
 * @param data - Task data for updating
 * @returns Updated task data
 */
export const update = async (boardId: string, taskId: string, data: Partial<ITask>): Promise<ITask> => {
  await repository.update(taskId, data)
  const task = await getById(boardId, taskId)
  return task!
}

/**
 * Remove a task
 * @param taskId - ID of a task
 * @returns User was removed
 */
export const remove = async (taskId: string): Promise<boolean> => {
  const res = await repository.delete(taskId)
  return !!res.affected
}
