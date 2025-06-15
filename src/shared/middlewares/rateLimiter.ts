import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';
import AppError from '../errors/AppError';
import { REDIS_HOST, REDIS_PORT } from '../../config/env';

const redisClient = new Redis({
  host: REDIS_HOST,
  port: Number(REDIS_PORT),
  password: undefined,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 20,
  duration: 60,
});

export default async function rateLimiter(
  request: Request,
  _: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip as string);

    return next();
  } catch (err) {
    throw new AppError('Too many requests.', 429);
  }
}
