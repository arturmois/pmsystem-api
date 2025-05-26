import UserRepository from "../../repositories/UserRepository";
import Professional from "../../models/Professional";
import Company from "../../models/Company";
import { inject } from "../../shared/di/DI";

export default class UserService {
  @inject('userRepository')
  private userRepository!: UserRepository;

  async registerProfessional(data: any) {
    const professional = await Professional.createProfessional(
      data.email,
      data.password,
      data.birthDate,
      data.role, data.name,
      data.preferredName,
      data.cpf,
      data.type,
      data.desk);
    await this.userRepository.createProfessional(professional);
  }

  async registerCompany(data: any) {
    const company = await Company.createCompany(
      data.email,
      data.password,
      data.birthDate,
      data.role,
      data.cnpj,
      data.address,
      data.fantasyName,
      data.socialReason,
      data.segment,
      data.monthlyFee,
      data.commission);
    await this.userRepository.createCompany(company);
  }

}