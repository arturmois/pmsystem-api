
import Budget from "../../models/entities/Budget";
import BudgetRepository from "../../repositories/BudgetRepository";
import { inject } from "../../shared/di/DI";

export default class BudgetService {
  @inject('budgetRepository')
  private budgetRepository !: BudgetRepository

  async serviceCreateBudget(data: any): Promise<any> {
    const budget = await Budget.modelCreateBudget(data);

    await this.budgetRepository.createBudget(budget);

    return { message: "Project created successfully", data: budget };
  }

  async serviceAllBudgets(id: string): Promise<any> {

    return await this.budgetRepository.repositoryAllBudgets(id);
  }

  async serviceUpdateBudget(id: string, payload: any): Promise<any> {

    const data = await this.budgetRepository.updateBudget(id, payload);

    return { message: "Budget updated successfully", data };
  }

  async serviceDeleteBudget(id: string): Promise<any> {
    await this.budgetRepository.deleteBudget(id);
    return { message: "Budget deleted successfully" };
  }
}