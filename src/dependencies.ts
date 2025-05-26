import { Registry } from "./shared/di/DI";
import AuthService from "./services/auth/AuthService";
import UserService from "./services/users/UserService";
import UserRepository from "./repositories/UserRepository";
import AuthController from "./controllers/AuthController";
import UserController from "./controllers/UserController";
import { PrismaClient } from "../generated/prisma";

export default class Dependencies {
  private registry: Registry;

  constructor() {
    this.registry = Registry.getInstance();

    this.registry.provide('prisma', new PrismaClient());
    this.registry.provide('userRepository', new UserRepository());
    this.registry.provide('userService', new UserService());
    this.registry.provide('authService', new AuthService());
    this.registry.provide('userController', new UserController());
    this.registry.provide('authController', new AuthController());
  }
}