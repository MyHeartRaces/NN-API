import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

const ormconfig: PostgresConnectionOptions = {
  type: process.env.DB_TYPE as 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'false',
  entities: ['dist/entities/**/*.js'],
  migrations: ['dist/migrations/**/*.js'],
  subscribers: ['dist/subscribers/**/*.js'],
};

export default ormconfig;
