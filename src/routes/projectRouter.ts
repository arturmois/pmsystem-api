import ProjectController from '../controllers/ProjectController';
import { Registry } from '../shared/di/DI';

type RouteDefinition = [methods: string, path: string, handler: Function];

export default class ProjectRouter {
  private projectController: ProjectController;
  private routes: RouteDefinition[];

  constructor() {
    this.projectController = Registry.getInstance().get('projectController');

    this.routes = [
      ['post', '/create-project', this.projectController.controllerCreateProject],
      ['get', '/:id', this.projectController.controllerGetAllProjects],
      ['put', '/update-project', this.projectController.controllerUpdateProject],
      ['delete', '/delete-project/:id', this.projectController.controllerDeleteProject],
    ];
  }

  getRoutes() {
    return this.routes;
  }
}
