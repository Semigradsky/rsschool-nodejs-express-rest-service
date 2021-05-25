const repository = require('./task.memory.repository');

/** @module task.service */

/**
 * Get all tasks
 * @param {string} boardId - ID of a board
 * @returns {Promise<Task[]>} - Array of all tasks
 */
const getAll = (boardId) => repository.getAll(boardId);

/**
 * Get task by ID
 * @param {string} boardId - ID of a board
 * @param {string} taskId - ID of a task
 * @returns {Promise<Task | undefined>} - Object with a particular task data
 */
const getById = (boardId, taskId) => repository.getById(boardId, taskId);

/**
 * Create a new task
 * @param {string} boardId - ID of a board
 * @param {Task} task - Task data
 * @returns {Promise<Task>} - New task data
 */
const create = (boardId, task) => repository.create(boardId, task.id, task);

/**
 * Update existing task or create new
 * @param {string} boardId - ID of a board
 * @param {string} taskId - ID of a task
 * @param {Partial<Task>} data - Task data for updating
 * @returns {Promise<Task>} - Updated task data
 */
const update = (boardId, taskId, data) =>
  repository.update(boardId, taskId, data);

/**
 * Remove a task
 * @param {string} boardId - ID of a board
 * @param {string} taskId - ID of a task
 * @returns {Promise<void>}
 */
const remove = (boardId, taskId) => repository.delete(boardId, taskId);

module.exports = { getAll, getById, create, update, remove };
