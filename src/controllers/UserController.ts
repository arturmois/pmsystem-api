import { Request, Response } from 'express';
import { professionalSchema, companySchema } from '../models/schemas/userSchemas';
import RegisterCompany from '../services/users/RegisterCompany';
import RegisterProfessional from '../services/users/RegisterProfessional';
import { inject } from '../shared/di/DI';
import { loginSchema } from '../models/schemas/loginSchema';
import SignIn from '../services/users/Signin';

export default class UserController {
  @inject('registerProfessional')
  @inject('registerCompany')
  @inject('signIn')
  private _registerProfessional!: RegisterProfessional;
  private _registerCompany!: RegisterCompany;
  private _signIn!: SignIn;

  registerProfessional = (req: Request, res: Response) => {
    const data = professionalSchema.parse(req.body);
    this._registerProfessional.execute(data);
    res.json({ message: "Professional registered" });
  }

  registerCompany = async (req: Request, res: Response) => {
    const input = companySchema.parse(req.body);
    await this._registerCompany.execute(input);
    res.json({ message: "Company registered" });
  }

  login = async (req: Request, res: Response) => {
    const { email, password } = loginSchema.parse(req.body);
    const result = await this._signIn.execute({ email, password });
    res.json({ token: result.token });
  }

}
