import dotenv from 'dotenv';

dotenv.config();

export const {
  PORT,
  JWT_SECRET,
  REDIS_HOST,
  REDIS_PORT,
  IDRIVE_ACCESS_KEY,
  IDRIVE_SECRET_KEY,
  IDRIVE_BUCKET_NAME,
  IDRIVE_ENDPOINT,
} = process.env;