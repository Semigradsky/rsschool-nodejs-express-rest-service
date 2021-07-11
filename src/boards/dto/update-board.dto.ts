import { IColumn } from '../column.entity';

export class UpdateBoardDto {
  title!: string;

  columns!: IColumn[];
}
