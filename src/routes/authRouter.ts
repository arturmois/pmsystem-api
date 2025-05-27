import { Router } from 'express';
import { Registry } from '../shared/di/DI';
import AuthController from '../controllers/AuthController';

export default class AuthRouter {
  private router: Router;
  private registry: Registry;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.registry = Registry.getInstance();
    this.authController = this.registry.get('authController');

    this.router.post('/login', this.authController.login);
  }

  getRouter() {
    return this.router;
  }
}
