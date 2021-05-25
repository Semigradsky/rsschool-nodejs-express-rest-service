const repository = require('./board.memory.repository');
const taskService = require('../tasks/task.service');

/**
 * An board
 * @typedef {Object} Board
 * @property {string} id - Board ID
 * @property {string} title - Board title
 * @property {Column[]} columns - Board columns
 */

/**
 * An board column
 * @typedef {Object} Column
 * @property {string} title - Board column title
 * @property {number} order - Board column order
 */

/** @module board.service */

/**
 * Get all boards
 * @returns {Promise<Board[]>} - Array of all boards
 */
const getAll = async () => repository.getAll();

/**
 * Get board by ID
 * @param {string} boardId - ID of a board
 * @returns {Promise<Board>} - Object with a particular board data
 */
const getById = async (boardId) => repository.getById(boardId);

/**
 * Create a new board
 * @param {Board} board - Board data
 * @returns {Promise<Board>} - New board data
 */
const create = async (board) => repository.create(board.id, board);

/**
 * Update existing board or create new
 * @param {string} boardId - ID of a board
 * @param {Partial<Board>} data - Board data for updating
 * @returns {Promise<Board>} - Updated board data
 */
const update = async (boardId, data) => repository.update(boardId, data);

/**
 * Remove a board
 * @param {string} boardId - ID of a board
 * @returns {Promise<void>}
 */
const remove = async (boardId) => {
  const tasks = await taskService.getAll(boardId);
  await Promise.all(tasks.map((task) => taskService.remove(boardId, task.id)));

  await repository.delete(boardId);
};

module.exports = { getAll, getById, create, update, remove };
