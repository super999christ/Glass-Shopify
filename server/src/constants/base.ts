import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const Environment = {
  DATABASE_HOST: String(process.env.POSTGRES_HOST),
  DATABASE_PORT: String(process.env.POSTGRES_PORT),
  DATABASE_USER: String(process.env.POSTGRES_USER),
  DATABASE_PASSWORD: String(process.env.POSTGRES_PASSWORD),
  DATABASE_NAME: String(process.env.POSTGRES_DB),
  TOKEN_SECRET: String(process.env.TOKEN_SECRET)
};
