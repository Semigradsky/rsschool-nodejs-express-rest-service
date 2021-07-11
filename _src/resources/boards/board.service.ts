import * as repository from './board.repository';
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
export const create = async (board: IBoard): Promise<IBoard> => repository.create(board);

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
 * @returns User was removed
 */
export const remove = async (boardId: string): Promise<boolean> => repository.remove(boardId);
