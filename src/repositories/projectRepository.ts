import { prisma } from "../config/database";
import Project from "../models/Project";

export class ProjectRepository {
    async repositoryCreateProject(project: Project) {
        const data = project.getProject();
        // Ensure that the startDate is a valid Date object

        await prisma.project.create({
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
        return await prisma.project.findMany({
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
        return await prisma.project.update({
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
        return await prisma.project.delete({
            where: {
                project_id: projectId,
            },
        });
    }

}