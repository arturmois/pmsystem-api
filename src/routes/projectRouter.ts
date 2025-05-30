import { Registry } from '../shared/di/DI';

type RouteDefinition = [methods: string, path: string, handler: Function];

export default class ProjectRouter {
  private routes: RouteDefinition[];

  constructor() {
    const projectsController = Registry.getInstance().inject('projectsController');

    this.routes = [
      ['post', '/create-project', projectsController.controllerCreateProject],
      ['get', '/:id', projectsController.controllerGetAllProjects],
      ['put', '/update-project', projectsController.controllerUpdateProject],
      ['delete', '/delete-project/:id', projectsController.controllerDeleteProject],
    ];
  }

  getRoutes() {
    return this.routes;
  }
}
