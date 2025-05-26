import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth/AuthService';
import { loginSchema } from '../models/schemas/loginSchema';
import { inject } from '../shared/di/DI';

export default class AuthController {
  @inject('authService')
  private authService!: AuthService;

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const token = await this.authService.login(email, password);
      res.json({ token });
    } catch (error) {
      next(error);
    }
  }
}