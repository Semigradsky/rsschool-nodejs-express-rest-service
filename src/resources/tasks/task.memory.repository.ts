import { ITask } from "./task.model";

/**
 * Task in-memory repository
 */
class TaskMemoryRepository {
  private _items: Record<string, Map<string, ITask>>;

  constructor() {
    this._items = {};
  }

  /**
   * Get all tasks
   * @param boardId - ID of a board
   * @returns Array of all tasks
   */
  async getAll(boardId: string): Promise<ITask[]> {
    return this._items[boardId]
      ? Array.from(this._items[boardId]!.values())
      : [];
  }

  /**
   * Get task by ID
   * @param boardId - ID of a board
   * @param taskId - ID of a task
   * @returns Object with a particular task data
   */
  async getById(boardId: string, id: string): Promise<ITask | undefined> {
    return this._items[boardId] ? this._items[boardId]!.get(id) : undefined;
  }

  /**
   * Create a new task
   * @param boardId - ID of a board
   * @param id - ID of a task
   * @param item - Task data
   * @returns New task data
   */
  async create(boardId: string, id: string, item: ITask): Promise<ITask> {
    if (!this._items[boardId]) {
      this._items[boardId] = new Map();
    }

    this._items[boardId]!.set(id, item);
    return item;
  }

  /**
   * Update existing task or create new
   * @param boardId - ID of a board
   * @param id - ID of a task
   * @param data - Task data for updating
   * @returns Updated task data
   */
  async update(boardId: string, id: string, data: Partial<ITask>): Promise<ITask> {
    const item = this._items[boardId] ? this._items[boardId]!.get(id) : null;

    if (!this._items[boardId]) {
      this._items[boardId] = new Map();
    }

    const updatedItem = {
      ...item,
      ...data,
    } as ITask;

    this._items[boardId]!.set(id, updatedItem);
    return updatedItem;
  }

  /**
   * Remove a task
   * @param boardId - ID of a board
   * @param id - ID of a task
   */
  async delete(boardId: string, id: string): Promise<void> {
    if (this._items[boardId]) {
      this._items[boardId]!.delete(id);
    }
  }
}

export default new TaskMemoryRepository();
