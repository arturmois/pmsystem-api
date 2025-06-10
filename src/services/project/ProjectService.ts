import Project from "../../models/entities/Project";
import { inject } from "../../shared/di/DI";
import ProjectRepository from "../../repositories/ProjectRepository";
import UserRepository from "../../repositories/UserRepository";
import AppError from "../../shared/errors/AppError";

export default class ProjectService {
  @inject('projectRepository')
  private projectRepository !: ProjectRepository
  @inject('userRepository')
  private userRepository !: UserRepository

  async create(data: any) {
    const user = await this.userRepository.getById(data.userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    if (user.getRole() !== 'PROFESSIONAL') {
      throw new AppError('User is not a professional', 403);
    }
    const project = await Project.create(data.title, data.startDate, user.getUserId());
    await this.projectRepository.create(project);
    return {
      projectId: project.getProjectId()
    }
  }

  async getAll(id: string): Promise<any> {
    return await this.projectRepository.repositoryAllProjects(id);
  }

  async update(data: any): Promise<any> {
    return await this.projectRepository.repositoryUpdateProject(data);
  }

  async delete(projectId: string): Promise<any> {
    await this.projectRepository.repositoryDeleteProject(projectId);
    return { message: "Project deleted successfully" };
  }

}
