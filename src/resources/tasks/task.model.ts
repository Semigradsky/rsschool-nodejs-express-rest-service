import { v4 as uuid } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import User from 'resources/users/user.model';
import Board from 'resources/boards/board.model';
import BoardColumn from 'resources/boards/column.model';

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
 @Entity()
class Task implements ITask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column('integer')
  order: number;

  @Column({ length: 255 })
  description: string;

  @ManyToOne(() => Board, { onDelete: 'CASCADE' })
  board!: Board;

  @Column()
  boardId: string;

  @ManyToOne(() => BoardColumn, { onDelete: 'SET NULL' })
  column!: BoardColumn;

  @Column({ nullable: true })
  columnId: string | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  user!: User;

  @Column({ nullable: true })
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
      title = '',
      order = 0,
      description = '',
      columnId = null,
      userId = null,
    }: Partial<ITask> = {}
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
