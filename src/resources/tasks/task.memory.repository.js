/**
 * Task in-memory repository
 */
class MemoryRepository {
  constructor() {
    this._items = new Map();
  }

  /**
   * Get all tasks
   * @param {string} boardId - ID of a board
   * @returns {Promise<Task[]>} - Array of all tasks
   */
  async getAll(boardId) {
    return this._items[boardId]
      ? Array.from(this._items[boardId].values())
      : [];
  }

  /**
   * Get task by ID
   * @param {string} boardId - ID of a board
   * @param {string} taskId - ID of a task
   * @returns {Promise<Task | undefined>} - Object with a particular task data
   */
  async getById(boardId, id) {
    return this._items[boardId] ? this._items[boardId].get(id) : null;
  }

  /**
   * Create a new task
   * @param {string} boardId - ID of a board
   * @param {string} id - ID of a task
   * @param {Task} item - Task data
   * @returns {Promise<Task>} - New task data
   */
  async create(boardId, id, item) {
    if (!this._items[boardId]) {
      this._items[boardId] = new Map();
    }

    this._items[boardId].set(id, item);
    return item;
  }

  /**
   * Update existing task or create new
   * @param {string} boardId - ID of a board
   * @param {string} id - ID of a task
   * @param {Partial<Task>} data - Task data for updating
   * @returns {Promise<Task>} - Updated task data
   */
  async update(boardId, id, data) {
    const item = this._items[boardId] ? this._items[boardId].get(id) : null;

    if (!this._items[boardId]) {
      this._items[boardId] = new Map();
    }

    const updatedItem = {
      ...item,
      ...data,
    };

    this._items[boardId].set(id, updatedItem);
    return updatedItem;
  }

  /**
   * Remove a task
   * @param {string} boardId - ID of a board
   * @param {string} id - ID of a task
   * @returns {Promise<void>}
   */
  async delete(boardId, id) {
    if (this._items[boardId]) {
      this._items[boardId].delete(id);
    }
  }
}

module.exports = new MemoryRepository();
