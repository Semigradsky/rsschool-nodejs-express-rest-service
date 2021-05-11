class MemoryRepository {
  constructor() {
    this._items = new Map();
  }

  async getAll() {
    return Array.from(this._items.values());
  }

  async getById(id) {
    return this._items.get(id);
  }

  async create(id, item) {
    this._items.set(id, item);
    return item;
  }

  async update(id, item) {
    const updatedItem = {
      ...this._items.get(id),
      ...item,
    };

    this._items.set(id, updatedItem);
    return updatedItem;
  }

  async delete(id) {
    this._items.delete(id);
  }
}

module.exports = MemoryRepository;
