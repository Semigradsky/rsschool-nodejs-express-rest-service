import * as taskService from 'resources/tasks/task.service';

import repository from './board.memory.repository';
import { IBoard } from './board.model';

/**
 * Get all boards
 * @returns Array of all boards
 */
export const getAll = async (): Promise<Array<IBoard>> => repository.getAll();

/**
 * Get board by ID
 * @param boardId - ID of a board
 * @returns Object with a particular board data
 */
export const getById = async (boardId: string): Promise<IBoard | undefined> => repository.getById(boardId);

/**
 * Create a new board
 * @param board - Board data
 * @returns New board data
 */
export const create = async (board: IBoard): Promise<IBoard> => repository.create(board.id, board);

/**
 * Update existing board or create new
 * @param boardId - ID of a board
 * @param data - Board data for updating
 * @returns Updated board data
 */
export const update = async (boardId: string, data: Partial<IBoard>): Promise<IBoard> => repository.update(boardId, data);

/**
 * Remove a board
 * @param boardId - ID of a board
 */
export const remove = async (boardId: string): Promise<void> => {
  const tasks = await taskService.getAll(boardId);
  await Promise.all(tasks.map((task) => taskService.remove(boardId, task.id)));

  await repository.delete(boardId);
};
