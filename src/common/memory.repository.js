/** @module memory.repository */

/**
 * In-memory repository
 */
class MemoryRepository {
  constructor() {
    this._items = new Map();
  }

  /**
   * Get all items
   * @template V - Type of an item
   * @returns {Promise<Array<V>>} - All items
   */
  async getAll() {
    return Array.from(this._items.values());
  }

  /**
   * Get item by ID
   * @template K - Type of key of an item
   * @template V - Type of an item
   * @param {K} id - ID of an item
   * @returns {Promise<V | undefined>} - Item
   */
  async getById(id) {
    return this._items.get(id);
  }

  /**
   * Create a new item
   * @template K - Type of key of an item
   * @template V - Type of an item
   * @param {K} id - ID of an item
   * @param {V} item - Item data
   * @returns {Promise<V>} - New item data
   */
  async create(id, item) {
    this._items.set(id, item);
    return item;
  }

  /**
   * Update existing item or create new
   * @template K - Type of key of an item
   * @template V - Type of an item
   * @param {K} id - ID of an item
   * @param {Partial<V>} data - Item data for updating
   * @returns {Promise<V>} - Updated item data
   */
  async update(id, item) {
    const updatedItem = {
      ...this._items.get(id),
      ...item,
    };

    this._items.set(id, updatedItem);
    return updatedItem;
  }

  /**
   * Remove an item
   * @template K - Type of key of an item
   * @param {K} id - ID of an item
   * @returns {Promise<void>}
   */
  async delete(id) {
    this._items.delete(id);
  }
}

module.exports = MemoryRepository;
