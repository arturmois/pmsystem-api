import Company from "../../models/entities/Company";
import { inject } from "../../shared/di/DI";
import IUserRepository from "../../repositories/UserRepository";
import AppError from "../../shared/errors/AppError";

export default class RegisterCompany {
  @inject('userRepository')
  private userRepository!: IUserRepository;

  async execute(input: Input): Promise<Output> {
    const company = await Company.createCompany(
      input.email,
      input.password,
      input.birthDate,
      input.role,
      input.phoneNumber,
      input.address,
      input.cnpj,
      input.fantasyName,
      input.socialReason,
      input.segment,
      input.monthlyFee,
      input.commission,
      input.platform1,
      input.platform2);
    const userExists = await this.userRepository.findByEmail(input.email);
    if (userExists) {
      throw new AppError('User already exists', 400);
    }
    const companyExists = await this.userRepository.findByCnpj(input.cnpj);
    if (companyExists) {
      throw new AppError('Company already exists', 400);
    }
    await this.userRepository.createCompany(company);
    return { userId: company.getUserId() };
  }

}

type Input = {
  email: string;
  password: string;
  birthDate: Date;
  role: string;
  phoneNumber: string;
  address: string;
  cnpj: string;
  fantasyName: string;
  socialReason: string;
  segment: string;
  monthlyFee: number;
  commission: number;
  platform1: string;
  platform2: string;
}

type Output = {
  userId: string;
}
