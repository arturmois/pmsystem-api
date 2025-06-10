import { NextFunction, Response, Request } from 'express';
import ProjectsService from "../services/project/ProjectService"
import { inject } from '../shared/di/DI';

export default class ProjectController {
  @inject('projectService')
  private projectService!: ProjectsService;

  create = async (req: any, res: Response, next: NextFunction) => {
    try {
      const input = req.body;
      input.userId = req.userId;
      const result = await this.projectService.create(input);
      res.status(201).json(result);
    }
    catch (error) {
      next(error);
    }
  }

  getAll = async (req: any, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;
      const result = await this.projectService.getAll(userId);
      res.json(result);
    } catch (error) {
      console.error(error);
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = req.body;
      const result = await this.projectService.update(input);
      res.json({ message: "Success", data: result, status: 200 });
    } catch (error) {
      next(error);
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = req.body;
      await this.projectService.delete(input);
      res.json({ message: "Deleted", status: 200 });
    } catch (error: any) {
      next(error);
    }
  }

}
