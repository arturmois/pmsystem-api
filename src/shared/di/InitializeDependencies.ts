import { Registry } from "./DI";
import { PrismaClient } from "../../../generated/prisma";
import fs from "fs";
import path from "path";

export default class InitializeDependencies {
  static registry(fullPath: string, file: string) {
    const serviceModule = require(fullPath);
    const fileClass = serviceModule.default || serviceModule;

    const nameFile = path.basename(file, path.extname(file));
    const nameFileModify = nameFile.charAt(0).toLowerCase() + nameFile.slice(1);

    Registry.getInstance().provide(nameFileModify, new fileClass());
  }

  static setProvide(pathName: string) {
    const repository = path.resolve(__dirname, `../../${pathName}`);
    fs.readdirSync(repository).forEach((file) => {
      const fullPath = path.join(repository, file);
      const stat = fs.statSync(fullPath);

      if (!stat.isDirectory()) {
        this.registry(fullPath, file);

        return;
      }

      fs.readdirSync(fullPath).forEach((fileInDirectory) => {
        this.registry(path.join(fullPath, fileInDirectory), fileInDirectory);
      });
    });
  }
  static initialize() {
    // Core dependencies
    Registry.getInstance().provide("prisma", new PrismaClient());

    // Repositories
    this.setProvide("repositories");

    // Services
    this.setProvide("services");

    // Controllers
    this.setProvide("controllers");
  }
}
