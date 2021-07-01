import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_HOST, POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USER } from 'src/common/config';
import { User } from 'src/users/user.entity';
import { InitMigration } from './migrations/init';

export const typeOrmModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: DB_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [User],
  migrations: [InitMigration],
  migrationsRun: true,
})
