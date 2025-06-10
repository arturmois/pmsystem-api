import { PrismaClient } from "@prisma/client";
import { inject } from "../shared/di/DI";
import Budget from "../models/entities/Budget";

export default class BudgetRepository {
  @inject('prisma')
  private prisma: PrismaClient;

  async createBudget(budget: Budget) {
    const data = budget.getBudget();

    await this.prisma.budget.create({
      data: {
        company_id: data.companyId,
        project_id: data.projectId,
        description: data.description,
        status: data.status,
      }
    })
  }

  async repositoryAllBudgets(projectId: string) {
    const budgets = await this.prisma.budget.findMany({
      where: {
        project_id: projectId
      }
    });

    return budgets.map((budget: any) => ({
      budgetId: budget.budget_id,
      projectId: budget.project_id,
      companyId: budget.company_id,
      description: budget.description,
      status: budget.status,
    }));
  }

  async updateBudget(id: String, data: any) {
    const existing = await this.prisma.budget.findUnique({ where: { budget_id: id } });

    if (!existing) {
      throw new Error('Orçamento não encontrado');
    }

    return await this.prisma.budget.update({
      where: { budget_id: id },
      data
    });
  }

  async deleteBudget(id: string) {
    await this.prisma.budget.delete({
      where: {
        budget_id: id,
      }
    });
  }
}