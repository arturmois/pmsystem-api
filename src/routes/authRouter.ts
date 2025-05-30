import AuthController from '../controllers/AuthController';
import { Registry } from '../shared/di/DI';

type RouteDefinition = [methods: string, path: string, handler: Function];

export default class AuthRouter {
  private authController: AuthController;
  private routes: RouteDefinition[];

  constructor() {
    this.authController = Registry.getInstance().get('authController');

    this.routes = [
      ['post', '/login', this.authController.login],
    ];
  }

  getRoutes() {
    return this.routes;
  }
}
