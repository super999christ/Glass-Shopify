import { DataSource } from 'typeorm';

import { Environment } from '../constants/base';
import { Merchant } from '../entities/merchant';
import { User } from '../entities/user';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: Environment.DATABASE_HOST,
  port: Number(Environment.DATABASE_PORT || '5432'),
  username: Environment.DATABASE_USER,
  password: Environment.DATABASE_PASSWORD,
  database: Environment.DATABASE_NAME,
  entities: [User, Merchant]
});
