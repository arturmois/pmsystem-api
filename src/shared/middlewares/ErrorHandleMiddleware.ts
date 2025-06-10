import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';

export default class ErrorHandleMiddleware {
  public static handleError(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        type: 'error',
        message: error.message,
      });
    }

    console.error(error);
    res.status(500).json({
      type: 'error',
      message: 'Internal server error',
    });
  }
}
