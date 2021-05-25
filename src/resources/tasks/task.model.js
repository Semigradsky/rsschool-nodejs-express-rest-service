const uuid = require('uuid').v4;

/**
 * A task
 * @typedef {Object} Task
 * @property {string} id - Task ID
 * @property {string} title - Task title
 * @property {number} order - Task order
 * @property {string} description - Task description
 * @property {string} boardId - Task board ID
 * @property {string | null} columnId - Task column ID
 * @property {string | null} userId - Task owner ID
 */

/** @module task.model */

/**
 * Class representing a task
 */
class Task {
  /**
   * Create an user
   * @param {string} boardId - Task board ID
   * @param {Task} param - Task data
   */
  constructor(
    boardId,
    {
      id = uuid(),
      title,
      order,
      description,
      columnId = null,
      userId = null,
    } = {}
  ) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.boardId = boardId;
    this.columnId = columnId;
    this.userId = userId;
  }
}

module.exports = Task;
