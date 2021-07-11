export class UpdateTaskDto {
  id!: string;

  title!: string;

  order!: number;

  description!: string;

  boardId!: string;

  columnId!: string | null;

  userId!: string | null;
}
