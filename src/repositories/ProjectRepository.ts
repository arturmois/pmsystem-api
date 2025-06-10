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

  async getAll(userId: string) {
    return await this.prisma.project.findMany({
      where: {
        professional: {
          user_id: userId
        }
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

  async update(data: any) {
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

  async delete(projectId: string) {
    return await this.prisma.project.delete({
      where: {
        project_id: projectId,
      },
    });
  }

}
