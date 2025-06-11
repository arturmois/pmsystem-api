import { Request, Response } from 'express';
import RegisterCompany from '../services/users/RegisterCompany';
import RegisterProfessional from '../services/users/RegisterProfessional';
import { inject } from '../shared/di/DI';
import SignIn from '../services/users/Signin';
import type GetUsers from '../services/users/GetUsers';

export default class UserController {
  @inject('registerProfessional')
  private _registerProfessional!: RegisterProfessional;
  @inject('registerCompany')
  private _registerCompany!: RegisterCompany;
  @inject('signin')
  private _signIn!: SignIn;
  @inject('getUsers')
  private _getUsers!: GetUsers;

  registerProfessional = async (req: Request, res: Response) => {
    const input = req.body;
    const result = await this._registerProfessional.execute(input);
    res.json({ userId: result.userId });

  }

  registerCompany = async (req: Request, res: Response) => {
    const input = req.body;
    const result = await this._registerCompany.execute(input);
    res.json({ userId: result.userId });

  }

  getUsers = async (req: Request, res: Response) => {
    const result = await this._getUsers.execute();
    res.json(result);
  }

  login = async (req: Request, res: Response) => {
    const input = req.body;
    const result = await this._signIn.execute(input);
    res.json({ token: result.token });
  }

}
