import { PrismaClient } from "@prisma/client";
import Company from "../models/entities/Company";
import Professional from "../models/entities/Professional";
import { inject } from "../shared/di/DI";
import { User } from "../models/entities/User";

export default interface IUserRepository {
  createProfessional(professional: Professional): Promise<void>;
  createCompany(company: Company): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findByCpf(cpf: string): Promise<Professional | null>;
  findByCnpj(cnpj: string): Promise<Company | null>;
}

export default class UserRepository implements IUserRepository {
  @inject('prisma')
  private prisma: PrismaClient;

  async createProfessional(professional: Professional): Promise<void> {
    await this.prisma.user.create({
      data: {
        email: professional.getEmail(),
        password: professional.getPassword(),
        birth_date: professional.getBirthDate(),
        role: professional.getRole(),
        phone_number: professional.getPhoneNumber(),
        address: professional.getAddress(),
        professional: {
          create: {
            cpf: professional.getCpf(),
            name: professional.getName(),
            gender: professional.getGender(),
            activity_area: professional.getActivityArea(),
            preferred_name: professional.getPreferredName(),
            professional_registration: professional.getProfessionalRegistration(),
            social_network: professional.getSocialNetwork(),
            desk: professional.getDesk()
          }
        }
      },
      include: {
        professional: true
      }
    });
  }

  async createCompany(company: Company): Promise<void> {
    await this.prisma.user.create({
      data: {
        email: company.getEmail(),
        password: company.getPassword(),
        birth_date: company.getBirthDate(),
        role: company.getRole(),
        company: {
          create: {
            cnpj: company.getCnpj(),
            address: company.getAddress(),
            fantasy_name: company.getFantasyName(),
            social_reason: company.getSocialReason(),
            segment: company.getSegment(),
            monthly_fee: company.getMonthlyFee(),
            commission: company.getCommission(),
          }
        }
      }
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        professional: true,
        company: true
      }
    });
    if (!user) return null;
    return new User(user.user_id, user.email, user.password, user.birth_date, user.role, user.phone_number, user.address);
  }

  async findByCpf(cpf: string): Promise<Professional | null> {
    return await this.prisma.professional.findUnique({
      where: { cpf }
    });
  }

  async findByCnpj(cnpj: string): Promise<Company | null> {
    return await this.prisma.company.findUnique({
      where: { cnpj }
    });
  }

}
