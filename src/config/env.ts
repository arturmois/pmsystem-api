import dotenv from 'dotenv';

dotenv.config();

export const {
  PORT,
  JWT_SECRET,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASS,
  REDIS_USER,
} = process.env;