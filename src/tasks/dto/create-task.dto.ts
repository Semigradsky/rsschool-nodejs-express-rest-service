export class CreateTaskDto {
  id!: string;

  title!: string;

  order!: number;

  description!: string;

  boardId!: string;

  columnId!: string | null;

  userId!: string | null;
}
