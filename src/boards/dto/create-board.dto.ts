import { IColumn } from '../column.entity';

export class CreateBoardDto {
  title!: string;

  columns!: IColumn[];
}
