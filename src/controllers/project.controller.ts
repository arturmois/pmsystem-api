import { RequestHandler } from "express";
import { schemaCreate, schemaUpdate } from "../models/schemas/projectSchemas";
import { z } from 'zod';
import { ProjectService } from "../services/project.service";

import { HttpException } from "../errors/HttpException";


export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  controllerCreateProject: RequestHandler = async (req, res, next) => {
    try {
      const data = schemaCreate.parse(req.body)

      const response = await this.projectService.serviceCreateProject(data);

      const { professinalId } = response.data;

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

  controllerGetAllProjects: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await this.projectService.serviceAllProjects(id);
      res.json({ message: "Success", data: result, status: 200 });
    } catch (error) {
      console.log(error);
    }
  }

  controllerUpdateProject: RequestHandler = async (req, res, next) => {
    try {
      const data = schemaUpdate.parse(req.body);
      const result = await this.projectService.serviceUpdateProject(data);

      res.json({ message: "Success", data: result, status: 200 });

    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
        return
      }

      if (error.code === 'P2025') {
        throw new HttpException(404, 'Projeto não encontrado.');
      }
      throw new HttpException(500, 'Erro inesperado.');
    }
  }

  controllerDeleteProject: RequestHandler = async (req, res, next) => {
    try {
      const projectId = req.params.id;
      const result = await this.projectService.serviceDeleteProject(projectId);
      res.json({ message: "Deleted", status: 200 });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new HttpException(404, 'Projeto não encontrado.');
      }
      throw new HttpException(500, 'Erro inesperado.');
    }
  }
}