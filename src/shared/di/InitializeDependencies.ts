import UserRepository from "../../repositories/UserRepository";
import RegisterCompany from "../../services/users/RegisterCompany";
import { Registry } from "./DI";
import ProjectRepository from "../../repositories/projectRepository";
import RegisterProfessional from "../../services/users/RegisterProfessional";
import ProjectService from "../../services/projects/ProjectService";
import UserController from "../../controllers/UserController";
import Signin from "../../services/users/Signin";
import { PrismaClient } from "../../../generated/prisma";

export default class InitializeDependencies {
  static initialize() {
    const registry = Registry.getInstance();

    // Core dependencies
    registry.provide('prisma', new PrismaClient());

    // Repositories
    registry.provide('userRepository', new UserRepository());
    registry.provide('projectRepository', new ProjectRepository());

    // Services
    registry.provide('registerProfessional', new RegisterProfessional());
    registry.provide('registerCompany', new RegisterCompany());
    registry.provide('signIn', new Signin());
    registry.provide('projectService', new ProjectService());

    // Controllers
    registry.provide('userController', new UserController());
  }
}