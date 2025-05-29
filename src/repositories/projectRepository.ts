import { PrismaClient } from "@prisma/client";
import Project from "../models/entities/Project";
import { inject } from "../shared/di/DI";

export class ProjectRepository {
  @inject('prisma')
  private prisma: PrismaClient;

  async repositoryCreateProject(project: Project) {
    const data = project.getProject();
    await this.prisma.project.create({
      data: {
        project_id: data.projectId,
        professional_id: data.professionalId,
        title: data.title,
        start_date: new Date(data.startDate)
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

  async repositoryUpdateProject(data: any) {
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
    return await this.prisma.project.delete({
      where: {
        project_id: projectId,
      },
    });
  }

}