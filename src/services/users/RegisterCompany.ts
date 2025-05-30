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
      input.cnpj,
      input.address,
      input.fantasyName,
      input.socialReason,
      input.segment,
      input.monthlyFee,
      input.commission);
    const userExists = await this.userRepository.findByEmail(input.email);
    if (userExists) {
      throw new AppError('User already exists', 400);
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
  cnpj: string;
  address: string;
  fantasyName: string;
  socialReason: string;
  segment: string;
  monthlyFee: number;
  commission: number;
}

type Output = {
  userId: string;
}
