import { DB_HOST, POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USER } from 'common/config';
import Board from 'resources/boards/board.model';
import BoardColumn from 'resources/boards/column.model';
import Task from 'resources/tasks/task.model';
import { InitMigration } from 'migrations/init';
import User from 'resources/users/user.model';
import { Connection, createConnection } from 'typeorm';
import * as usersService from 'resources/users/user.service';

let connection: Connection | null = null

export const getConnection = () => connection

export const initializeDB = async () => {
  connection = await createConnection({
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

  return connection
}

export const createAdmin = async () => {
  const admin = await usersService.getByLogin('admin')

  if (!admin) {
    await usersService.create(new User({
      name: 'admin',
      login: 'admin',
      password: 'admin',
    }))
  }
}
