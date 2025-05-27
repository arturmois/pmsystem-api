import Project from "../models/Project";
import { ProjectRepository } from "../repositories/projectRepository";

export class ProjectService {
  // Add methods for project-related logic here
  // For example, methods to create, update, delete, and retrieve projects
  constructor(private readonly projectRepository: ProjectRepository) { }

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