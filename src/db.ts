import { DB_HOST, POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USER } from 'common/config';
import User from 'resources/users/user.model';
import { Connection, createConnection } from 'typeorm';

let connection: Connection | null = null

export const initializeDB = async () => {
  connection = await createConnection({
    type: 'postgres',
    host: DB_HOST,
    port: POSTGRES_PORT,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    entities: [User],
    synchronize: true,
  })
  return connection
}

export const getConnection = () => connection
