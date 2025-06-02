import { NextFunction, Request, Response } from 'express';
import { schemaCreate, schemaUpdate } from "../models/schemas/projectSchemas";
import { z } from 'zod';
import ProjectsService from "../services/project/ProjectsService"
import { inject } from '../shared/di/DI';

export default class ProjectController {
  @inject('projectService')
  private projectService!: ProjectsService;

  controllerCreateProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = schemaCreate.parse(req.body)
      const response = await this.projectService.serviceCreateProject(data);
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
      console.log(error);
    }
  }

  controllerUpdateProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = schemaUpdate.parse(req.body);
      const result = await this.projectService.serviceUpdateProject(data);

      res.json({ message: "Success", data: result, status: 200 });

    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
        return
      }
    }
  }

  controllerDeleteProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId = req.params.id;
      const result = await this.projectService.serviceDeleteProject(projectId);
      res.json({ message: "Deleted", status: 200 });
    } catch (error: any) {
    }
  }
}