import { Request, Response, NextFunction } from 'express';
import { professionalSchema, companySchema } from '../models/schemas/userSchemas';
import RegisterCompany from '../services/users/RegisterCompany';
import RegisterProfessional from '../services/users/RegisterProfessional';
import { inject } from '../shared/di/DI';
import { loginSchema } from '../models/schemas/loginSchema';
import SignIn from '../services/users/Signin';

export default class UserController {
  @inject('registerProfessional')
  private _registerProfessional!: RegisterProfessional;
  @inject('registerCompany')
  private _registerCompany!: RegisterCompany;
  @inject('signin')
  private _signIn!: SignIn;

  registerProfessional = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = professionalSchema.parse(req.body);
      await this._registerProfessional.execute(input);
      res.json({ message: "Professional registered" });
    } catch (error) {
      next(error);
    }
  }

  registerCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = companySchema.parse(req.body);
      await this._registerCompany.execute(input);
      res.json({ message: "Company registered" });
    } catch (error) {
      next(error);
    }
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = loginSchema.parse(req.body);
      const result = await this._signIn.execute(input);
      res.json({ token: result.token });
    } catch (error) {
      next(error);
    }
  }
}
