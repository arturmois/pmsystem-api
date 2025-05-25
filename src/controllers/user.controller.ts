import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { professionalSchema, companySchema } from '../models/schemas/userSchemas';
import { UserService } from '../services/user.service';

export class UserController {

  constructor(private readonly userService: UserService) { }

  login: RequestHandler = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const token = await this.userService.login(email, password);
      res.json({ token });
    } catch (error) {
      next(error);
    }
  }

  registerProfessional: RequestHandler = async (req, res, next) => {
    try {
      const data = professionalSchema.parse(req.body);
      console.log(data);
      await this.userService.registerProfessional(data);
      console.log("Professional registered");
      res.status(201).json({ message: "Professional registered" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        next(error);
      }
    }
  }

  registerCompany: RequestHandler = async (req, res, next) => {
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

  getUser: RequestHandler = async (req, res, next) => {
    try {
      const userId = (req as any).userId;
      const user = await this.userService.getUser(userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

}