import type { PrismaClient } from "../../generated/prisma";
import Project from "../models/entities/Project";
import { inject } from "../shared/di/DI";

export default class ProjectRepository {
  @inject('prisma')
  private prisma!: PrismaClient;

  async create(project: Project) {
    await this.prisma.project.create({
      data: {
        project_id: project.getProjectId(),
        title: project.getTitle(),
        start_date: new Date(project.getStartDate()),
        professional: {
          connect: {
            user_id: project.getProfessionalId()
          }
        }
      }
    })
  }

  async repositoryAllProjects(id: string) {
    return await this.prisma.project.findMany({
      where: {
        professional_id: id,
      },
      orderBy: {
        start_date: 'asc',
      },
    })
  }

  async getById(projectId: string) {
    console.log(projectId);
    return await this.prisma.project.findUnique({
      where: {
        project_id: projectId,
      },
    });
  }

  async repositoryUpdateProject(data: any) {
    // Update the project with the given projectId
    return await this.prisma.project.update({
      where: {
        project_id: data.projectId,
      },
      data: {
        title: data.title,
        start_date: new Date(data.startDate),
      },
    });
  }

  async repositoryDeleteProject(projectId: string) {
    // Delete the project with the given projectId
    return await this.prisma.project.delete({
      where: {
        project_id: projectId,
      },
    });
  }

}