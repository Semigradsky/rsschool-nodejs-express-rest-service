import { getConnection } from 'db';
import Board, { IBoard } from './board.model';

const repository = getConnection()!.getRepository(Board);

/**
 * Get all boards
 * @returns Array of all boards
 */
export const getAll = async (): Promise<Array<IBoard>> => repository.find();

/**
 * Get board by ID
 * @param boardId - ID of a board
 * @returns Object with a particular board data
 */
export const getById = async (boardId: string): Promise<IBoard | undefined> => repository.findOne(boardId);

/**
 * Create a new board
 * @param board - Board data
 * @returns New board data
 */
export const create = async (board: IBoard): Promise<IBoard> => repository.save(board)

/**
 * Update existing board or create new
 * @param boardId - ID of a board
 * @param data - Board data for updating
 * @returns Updated board data
 */
export const update = async (boardId: string, data: Partial<IBoard>): Promise<IBoard> => {
  const { columns, ...otherData } = data
  await repository.update(boardId, otherData)
  const board = await getById(boardId)
  return board!
}

/**
 * Remove a board
 * @param boardId - ID of a board
 * @returns User was removed
 */
export const remove = async (boardId: string): Promise<boolean> => {
  const res = await repository.delete(boardId)
  return !!res.affected
};
