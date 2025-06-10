import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import ProjectsService from "../services/project/ProjectService"
import { inject } from '../shared/di/DI';

export default class ProjectController {
  @inject('projectService')
  private projectService!: ProjectsService;

  controllerCreateProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = req.body;
      const response = await this.projectService.serviceCreateProject(input);
      res.json({ message: "Success", data: response.data, status: 201 });
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        next(error);
      }
    }
  }

  controllerGetAllProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.projectService.serviceAllProjects(id);
      res.json({ message: "Success", data: result, status: 200 });
    } catch (error) {
      console.error(error);
    }
  }

  controllerUpdateProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = req.body;
      const result = await this.projectService.serviceUpdateProject(input);
      res.json({ message: "Success", data: result, status: 200 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
        return
      }
    }
  }

  controllerDeleteProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = req.body;
      await this.projectService.serviceDeleteProject(input);
      res.json({ message: "Deleted", status: 200 });
    } catch (error: any) {
    }
  }
}