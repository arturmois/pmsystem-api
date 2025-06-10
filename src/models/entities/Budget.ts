import crypto from 'crypto';

export default class Budget {
  private budget_id: string;
  private project_id: string;
  private company_id: string;
  private description: string;
  private status: string;

  constructor(
    budgetId: string,
    projectId: string,
    companyId: string,
    description: string,
    status: string = 'pending',
  ) {
    this.budget_id = budgetId;
    this.project_id = projectId;
    this.company_id = companyId;
    this.description = description;
    this.status = status;
  }

  static async modelCreateBudget(data: any) {
    const budgetId = crypto.randomUUID();
    return new Budget(
      budgetId,
      data.projectId,
      data.companyId,
      data.description,
      data.status || 'pending',
    );
  }

  getBudget() {
    return {
      budgetId: this.budget_id,
      projectId: this.project_id,
      companyId: this.company_id,
      description: this.description,
      status: this.status,
    };
  }
}
