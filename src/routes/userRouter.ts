import { Router } from 'express';
import UserController from '../controllers/UserController';
import { Registry } from '../shared/di/DI';

export default class UserRouter {
  private router: Router;
  private registry: Registry;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.registry = Registry.getInstance();
    this.userController = this.registry.get('userController');

    this.router.post('/register-professional', this.userController.registerProfessional);
    this.router.post('/register-company', this.userController.registerCompany);
  }

  getRouter() {
    return this.router;
  }
}