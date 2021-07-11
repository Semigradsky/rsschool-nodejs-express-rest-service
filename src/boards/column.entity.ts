import { v4 as uuid } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import type { IBoard } from './board.entity';
// eslint-disable-next-line import/no-cycle
import { Board } from './board.entity';

export interface IColumn {
  id: string;
  title: string;
  order: number;
}

/**
 * Class representing a column
 */
@Entity()
export class BoardColumn implements IColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column('integer')
  order: number;

  @ManyToOne(() => Board, { onDelete: 'CASCADE' })
  board!: IBoard;

  @Column()
  boardId: string = '';

  /**
   * Create a column
   * @param param - Column data
   */
  constructor({ id = uuid(), title = '', order = 0 }: Partial<IColumn> = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}
