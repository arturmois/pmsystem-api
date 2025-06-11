import crypto from 'crypto';

export default class Budget {
  private budgetId: string;
  private projectId: string;
  private companyId: string;
  private description: string;
  private status: string;

  constructor(budgetId: string, projectId: string, companyId: string, description: string) {
    this.budgetId = budgetId;
    this.projectId = projectId;
    this.companyId = companyId;
    this.description = description;
    this.status = "pending";
  }

  static async create(companyId: string, description: string, projectId: string) {
    const budgetId = crypto.randomUUID();
    return new Budget(budgetId, projectId, companyId, description);
  }

  getBudgetId() {
    return this.budgetId;
  }

  getProjectId() {
    return this.projectId;
  }

  getCompanyId() {
    return this.companyId;
  }

  getDescription() {
    return this.description;
  }

  getStatus() {
    return this.status;
  }
}
