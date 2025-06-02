import { PrismaClient } from "@prisma/client";
import Project from "../models/entities/Project";
import { inject } from "../shared/di/DI";

export default class ProjectRepository {
  @inject('prisma')
  private prisma: PrismaClient;

  async createProject(project: Project) {
    const data = project.getProject();
    // Ensure that the startDate is a valid Date object

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
    // Retrieve all projects associated with the professional ID
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