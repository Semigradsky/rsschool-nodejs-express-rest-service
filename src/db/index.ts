import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/boards/board.entity';
import { BoardColumn } from 'src/boards/column.entity';
import { DB_HOST, POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USER } from 'src/common/config';
import { Task } from 'src/tasks/task.entity';
import { User } from 'src/users/user.entity';
import { InitMigration } from './migrations/init';

export const typeOrmModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: DB_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [User, Board, BoardColumn, Task],
  migrations: [InitMigration],
  migrationsRun: true,
})
