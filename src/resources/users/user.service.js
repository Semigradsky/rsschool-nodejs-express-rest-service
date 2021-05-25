const repository = require('./user.memory.repository');
const boardService = require('../boards/board.service');
const taskService = require('../tasks/task.service');

/**
 * An user
 * @typedef {Object} User
 * @property {string} id - User ID
 * @property {string} name - User name
 * @property {string} login - User login
 * @property {string} password - User password
 */

/** @module user.service */

/**
 * Get all users
 * @returns {Promise<User[]>} - Array of all users
 */
const getAll = async () => repository.getAll();

/**
 * Get user by ID
 * @param {string} userId - ID of an user
 * @returns {Promise<User>} - Object with a particular user data
 */
const getById = async (userId) => repository.getById(userId);

/**
 * Create a new user
 * @param {User} user - User data
 * @returns {Promise<User>} - New user data
 */
const create = async (user) => repository.create(user.id, user);

/**
 * Update existing user or create new
 * @param {string} userId - ID of an user
 * @param {Partial<User>} data - User data for updating
 * @returns {Promise<User>} - Updated user data
 */
const update = async (userId, data) => repository.update(userId, data);

/**
 * Remove an user
 * @param {string} userId - ID of an user
 * @returns {Promise<void>}
 */
const remove = async (userId) => {
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

module.exports = { getAll, getById, create, update, remove };
