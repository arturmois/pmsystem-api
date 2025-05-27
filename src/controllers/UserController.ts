import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { professionalSchema, companySchema } from '../models/schemas/userSchemas';
import { inject } from '../shared/di/DI';
import UserService from '../services/users/UserService';

export default class UserController {
  @inject('userService')
  private userService!: UserService;

  registerProfessional = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = professionalSchema.parse(req.body);
      await this.userService.registerProfessional(data);
      res.status(201).json({ message: "Professional registered" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        next(error);
      }
    }
  }

  registerCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = companySchema.parse(req.body);
      await this.userService.registerCompany(input);
      res.status(201).json({ message: "Company registered" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        next(error);
      }
    }
  }

}