
import Budget from "../../models/entities/Budget";
import BudgetRepository from "../../repositories/BudgetRepository";
import type ProjectRepository from "../../repositories/ProjectRepository";
import type UserRepository from "../../repositories/UserRepository";
import { inject } from "../../shared/di/DI";
import AppError from "../../shared/errors/AppError";

export default class BudgetService {
  @inject('budgetRepository')
  private budgetRepository!: BudgetRepository
  @inject('userRepository')
  private userRepository!: UserRepository
  @inject('projectRepository')
  private projectRepository!: ProjectRepository

  async create(input: any) {
    console.log(input);
    const professional = await this.userRepository.getProfessionalByUserId(input.userId);
    if (!professional) {
      throw new AppError('User not found', 404);
    }
    if (professional.getRole() !== 'PROFESSIONAL') {
      throw new AppError('User is not a professional', 403);
    }
    const project = await this.projectRepository.getById(input.projectId);
    if (!project) {
      throw new AppError('Project not found', 404);
    }
    const budget = await Budget.create(professional.getProfessionalId(), input.description, input.projectId);
    await this.budgetRepository.create(budget);
    return {
      budgetId: budget.getBudgetId()
    }
  }

  async getAll(id: string) {
    return await this.budgetRepository.getAll(id);
  }

  async update(id: string, payload: any) {
    const data = await this.budgetRepository.update(id, payload);
    return { message: "Budget updated successfully", data };
  }

  async delete(id: string) {
    await this.budgetRepository.delete(id);
    return { message: "Budget deleted successfully" };
  }
}