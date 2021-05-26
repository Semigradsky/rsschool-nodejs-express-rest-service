class MemoryRepository<K, V> {
  private _items: Map<K, V>;

  constructor() {
    this._items = new Map();
  }

  /**
   * Get all items
   * @returns All items
   */
  async getAll(): Promise<V[]> {
    return Array.from(this._items.values());
  }

  /**
   * Get item by ID
   * @param id - ID of an item
   * @returns Item
   */
  async getById(id: K): Promise<V | undefined> {
    return this._items.get(id);
  }

  /**
   * Create a new item
   * @param id - ID of an item
   * @param item - Item data
   * @returns New item data
   */
  async create(id: K, item: V): Promise<V> {
    this._items.set(id, item);
    return item;
  }

  /**
   * Update existing item or create new
   * @param id - ID of an item
   * @param data - Item data for updating
   * @returns Updated item data
   */
  async update(id: K, item: Partial<V>): Promise<V> {
    const updatedItem = {
      ...this._items.get(id),
      ...item,
    } as V;

    this._items.set(id, updatedItem);
    return updatedItem;
  }

  /**
   * Remove an item
   * @param id - ID of an item
   */
  async delete(id: K): Promise<void> {
    this._items.delete(id);
  }
}

export default MemoryRepository;
