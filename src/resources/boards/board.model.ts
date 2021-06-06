import { v4 as uuid } from 'uuid';

export interface IBoard {
  id: string;
  title: string;
  columns: IColumn[];
}

interface IColumn {
  id: string;
  title: string;
  order: number;
}

/**
 * Class representing an board
 */
class Board implements IBoard {
  id: string;

  title: string;

  columns: IColumn[];

  /**
   * Create an user
   * @param param - Board data
   */
  constructor({ id = uuid(), title, columns }: IBoard) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

export default Board;
