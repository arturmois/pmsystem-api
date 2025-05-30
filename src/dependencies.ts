import { Registry } from "./shared/di/DI";
import { PrismaClient } from "../generated/prisma";

//service
import AuthService from "./services/auth/AuthService";
import UserService from "./services/users/UserService";
import ProjectService from "./services/project/ProjectService";

//repository
import UserRepository from "./repositories/UserRepository";
import ProjectRepository from "./repositories/ProjectRepository";

//controller
import AuthController from "./controllers/AuthController";
import UserController from "./controllers/UserController";
import ProjectController from "./controllers/ProjectController";

export default class Dependencies {
  private registry: Registry;

  constructor() {
    this.registry = Registry.getInstance();

    this.registry.provide('prisma', new PrismaClient());

    //repository
    this.registry.provide('userRepository', new UserRepository());
    this.registry.provide('projectRepository', new ProjectRepository());


    //service
    this.registry.provide('userService', new UserService());
    this.registry.provide('authService', new AuthService());
    this.registry.provide('projectService', new ProjectService());


    //controller
    this.registry.provide('userController', new UserController());
    this.registry.provide('authController', new AuthController());
    this.registry.provide('projectController', new ProjectController());
  }
}