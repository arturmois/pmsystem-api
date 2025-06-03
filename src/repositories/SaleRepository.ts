import { PrismaClient } from "@prisma/client";
import { Sale } from "../models/entities/Sale";
import { inject } from "../shared/di/DI";

export default interface ISaleRepository {}

export default class SaleRepository implements ISaleRepository {
  @inject("prisma")
  private prisma: PrismaClient;

  async createSale(sale: Sale) {
    await this.prisma.sale.create({
      data: {
        sale_id: sale.getSaleId(),
        budget_id: sale.getBudgetId(),
        company_id: sale.getCompanyId(),
        professional_id: sale.getProfessionalId(),
        value: sale.getValue(),
      },
    });
  }

  async findSaleBySaleId(saleId: string) {
    return await this.prisma.sale.findUnique({
      where: {
        sale_id: saleId,
      },
    });
  }

  async findAllSales() {
    return await this.prisma.sale.findMany();
  }

  async updateSale(sale: Sale) {
    await this.prisma.sale.update({
      where: {
        sale_id: sale.getSaleId(),
      },
      data: {
        budget_id: sale.getBudgetId(),
        company_id: sale.getCompanyId(),
        professional_id: sale.getProfessionalId(),
        value: sale.getValue(),
      },
    });
  }

  async deleteSale(saleId: string) {
    await this.prisma.sale.delete({
      where: {
        sale_id: saleId,
      },
    });
  }
}
