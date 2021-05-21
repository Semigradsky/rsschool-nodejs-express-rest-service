class MemoryRepository {
  constructor() {
    this._items = new Map();
  }

  async getAll(boardId) {
    return this._items[boardId]
      ? Array.from(this._items[boardId].values())
      : [];
  }

  async getById(boardId, id) {
    return this._items[boardId] ? this._items[boardId].get(id) : null;
  }

  async create(boardId, id, item) {
    if (!this._items[boardId]) {
      this._items[boardId] = new Map();
    }

    this._items[boardId].set(id, item);
    return item;
  }

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

  async delete(boardId, id) {
    if (this._items[boardId]) {
      this._items[boardId].delete(id);
    }
  }
}

module.exports = new MemoryRepository();
