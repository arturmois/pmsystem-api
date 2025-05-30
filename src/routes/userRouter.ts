import UserController from '../controllers/UserController';
import { Registry } from '../shared/di/DI';

export default class UserRouter {
  private userController: UserController;
  private routes

  constructor() {
    this.userController = Registry.getInstance().get('userController');
    this.routes = [
      ['post', '/register-professional', this.userController.registerProfessional],
      ['post', '/register-company', this.userController.registerCompany],
    ]
  }

  getRoutes() {
    return this.routes;
  }
}
