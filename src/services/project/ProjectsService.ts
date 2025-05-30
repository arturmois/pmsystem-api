import Project from "../../models/entities/Project";
import { inject } from "../../shared/di/DI";
import ProjectsRepository from "../../repositories/ProjectsRepository";

export default class ProjectsService {

  @inject('projectsRepository')
  private projectsRepository !: ProjectsRepository

  async serviceCreateProject(data: any): Promise<any> {
    const project = await Project.modelCreateProject(data);

    await this.projectsRepository.createProject(project);

    return { message: "Project created successfully", data: project };
  }


  async serviceAllProjects(id: string): Promise<any> {

    return await this.projectsRepository.repositoryAllProjects(id);
  }


  async serviceUpdateProject(data: any): Promise<any> {

    return await this.projectsRepository.repositoryUpdateProject(data);
  }


  async serviceDeleteProject(projectId: string): Promise<any> {
    // Logic to delete a project
    await this.projectsRepository.repositoryDeleteProject(projectId);
    return { message: "Project deleted successfully" };
  }
}