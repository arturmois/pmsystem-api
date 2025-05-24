import { Request, Response } from "express";
import { registerProfessionalSchema } from "../model/schema/authSchema";
import { z } from "zod";
import AuthService from "../service/AuthService";

export default class AuthController {
  static login(req: Request, res: Response) {
    const { email, password } = req.body;
    res.json({ message: "Login successful" });
  }

  static async registerProfessional(req: Request, res: Response) {
    try {
      const { email, password, birthDate, type } = registerProfessionalSchema.parse(req.body);
      const user = await AuthService.registerProfessional({ email, password, birthDate, type });
      res.json({ user });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.flatten().fieldErrors });
      } else {
        res.status(500).json({ error: (error as Error).message });
      }
    }
  }

  static registerCompany(req: Request, res: Response) {
    const { email, password } = req.body;
    res.json({ message: "Register successful" });
  }
}