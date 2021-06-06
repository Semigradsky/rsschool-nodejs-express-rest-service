import { v4 as uuid } from 'uuid';

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  boardId: string;
  columnId: string | null;
  userId: string | null;
}

/**
 * Class representing a task
 */
class Task implements ITask {
  id: string;

  title: string;

  order: number;

  description: string;

  boardId: string;

  columnId: string | null;

  userId: string | null;

  /**
   * Create an user
   * @param boardId - Task board ID
   * @param param - Task data
   */
  constructor(
    boardId: string,
    {
      id = uuid(),
      title,
      order,
      description,
      columnId = null,
      userId = null,
    }: ITask
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

export default Task;
