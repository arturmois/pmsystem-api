export class Sale {
  private saleId: string;
  private budgetId: string;
  private companyId: string;
  private professionalId: string;
  private value: number;

  constructor(
    saleId: string,
    budgetId: string,
    companyId: string,
    professionalId: string,
    value: number
  ) {
    this.saleId = saleId;
    this.budgetId = budgetId;
    this.companyId = companyId;
    this.professionalId = professionalId;
    this.value = value;
  }

  static async modelCreateSale(data: any) {
    const saleId = crypto.randomUUID();
    return new Sale(
      saleId,
      data.budgetId,
      data.companyId,
      data.professionalId,
      data.value
    );
  }

  getSaleId() {
    return this.saleId;
  }

  getBudgetId() {
    return this.budgetId;
  }

  getCompanyId() {
    return this.companyId;
  }

  getProfessionalId() {
    return this.professionalId;
  }

  getValue() {
    return this.value;
  }
}
