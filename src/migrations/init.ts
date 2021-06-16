import { MigrationInterface, QueryRunner } from 'typeorm';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["up", "down"] }] */
class InitMigration1623842272887 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "user" (
      id UUID NOT NULL,
      name VARCHAR(100),
      login VARCHAR(100),
      password VARCHAR(100),
      PRIMARY KEY(id)
    )`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "user"');
  }
}

export { InitMigration1623842272887 as InitMigration }
