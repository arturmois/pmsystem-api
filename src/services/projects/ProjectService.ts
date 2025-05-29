import Project from "../../models/entities/Project";
import { ProjectRepository } from "../../repositories/projectRepository";
import { inject } from "../../shared/di/DI";

export class ProjectService {
  @inject('projectRepository')
  private projectRepository!: ProjectRepository;

  async serviceCreateProject(data: any): Promise<any> {
    const project = await Project.modelCreateProject(data);

    await this.projectRepository.repositoryCreateProject(project);

    return { message: "Project created successfully", data: project };
  }


  async serviceAllProjects(id: string): Promise<any> {

    return await this.projectRepository.repositoryAllProjects(id);
  }


  async serviceUpdateProject(data: any): Promise<any> {

    return await this.projectRepository.repositoryUpdateProject(data);
  }


  async serviceDeleteProject(projectId: string): Promise<any> {
    // Logic to delete a project
    await this.projectRepository.repositoryDeleteProject(projectId);
    return { message: "Project deleted successfully" };
  }
}