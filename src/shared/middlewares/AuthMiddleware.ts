import { NextFunction, Response, Request } from 'express';
import { Secret, verify } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import { JWT_SECRET } from '../../config/env';

interface ITokenPayload {
  iat: number;
  exp: number;
  userId: string;
}

export default class AuthMiddleware {
  static execute(
    request: any,
    response: Response,
    next: NextFunction,
  ): void {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new AppError('JWT Token is missing.', 401);
    }
    const [, token] = authHeader.split(' ');
    try {
      const decodedToken = verify(token, JWT_SECRET as Secret);
      const { userId } = decodedToken as ITokenPayload;
      request.userId = userId;
      return next();
    } catch (error) {
      throw new AppError('Invalid JWT Token.', 401);
    }
  }
}
