import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';

export default class ErrorHandleMiddleware {
  public static execute = (
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        type: 'error',
        message: error.message,
      });
    }

    console.error(error);
    return res.status(500).json({
      type: 'error',
      message: 'Internal server error',
    });
  }
}
