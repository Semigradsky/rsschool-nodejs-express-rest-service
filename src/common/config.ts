import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
  POSTGRES_DB,
  DB_HOST,
  SECRET,
} = process.env;

export const POSTGRES_PORT = Number(process.env['POSTGRES_PORT'])

export const AUTH_MODE = process.env['AUTH_MODE'] === 'true';

export const USE_FASTIFY = process.env['USE_FASTIFY'] === 'true';
