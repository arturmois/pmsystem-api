import { inject } from "../shared/di/DI";
import Budget from "../models/entities/Budget";
import type { PrismaClient } from "../../generated/prisma";

export default class BudgetRepository {
  @inject('prisma')
  private prisma!: PrismaClient;

  async create(budget: Budget) {
    await this.prisma.budget.create({
      data: {
        budget_id: budget.getBudgetId(),
        description: budget.getDescription(),
        status: budget.getStatus(),
        project: {
          connect: {
            project_id: budget.getProjectId()
          }
        },
      }
    })
  }

  async getAll(projectId: string) {
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


  async getById(id: string) {
    return await this.prisma.budget.findUnique({
      where: { budget_id: id },
    });
  }

  async update(id: string, data: any) {
    const existing = await this.prisma.budget.findUnique({ where: { budget_id: id } });

    if (!existing) {
      throw new Error('Orçamento não encontrado');
    }

    return await this.prisma.budget.update({
      where: { budget_id: id },
      data
    });
  }

  async delete(id: string) {
    await this.prisma.budget.delete({
      where: {
        budget_id: id,
      }
    });
  }

}
