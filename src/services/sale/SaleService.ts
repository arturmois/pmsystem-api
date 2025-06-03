import { Sale } from "../../models/entities/Sale";
import { inject } from "../../shared/di/DI";
import SaleRepository from "../../repositories/SaleRepository";

export default class SaleService {
  @inject("saleRepository")
  private saleRepository!: SaleRepository;

  async serviceCreateSale(data: any): Promise<any> {
    const sale = await Sale.modelCreateSale(data);
    await this.saleRepository.createSale(sale);
    return { message: "Sale created successfully", data: sale };
  }

  async serviceCreateSaleBudget(data: any): Promise<any> {
    const sale = await Sale.modelCreateSale(data);
    await this.saleRepository.createSale(sale);
    return { message: "Sale created successfully", data: sale };
  }

  async serviceFindSaleBySaleId(saleId: string): Promise<any> {
    return await this.saleRepository.findSaleBySaleId(saleId);
  }

  async serviceFindAllSales(): Promise<any> {
    return await this.saleRepository.findAllSales();
  }

  async serviceUpdateSale(data: any): Promise<any> {
    return await this.saleRepository.updateSale(data);
  }

  async serviceDeleteSale(saleId: string): Promise<any> {
    return await this.saleRepository.deleteSale(saleId);
  }
}
