import Company from "../models/entities/Company";
import Professional from "../models/entities/Professional";
import { User } from "../models/entities/User";
import database from "../config/database";
import type { PrismaClient } from "../../generated/prisma";
import { inject } from "../shared/di/DI";

export default interface IUserRepository {
  createProfessional(professional: Professional): Promise<void>;
  createCompany(company: Company): Promise<void>;
  getUsers(): Promise<User[]>;
  getById(userId: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  getByCpf(cpf: string): Promise<Professional | null>;
  getByCnpj(cnpj: string): Promise<Company | null>;
}

export default class UserRepository implements IUserRepository {
  @inject('prisma')
  private prisma!: PrismaClient;

  async createProfessional(professional: Professional): Promise<void> {
    await this.prisma.user.create({
      data: {
        user_id: professional.getUserId(),
        email: professional.getEmail(),
        password: professional.getPassword(),
        birth_date: professional.getBirthDate(),
        role: professional.getRole(),
        phone_number: professional.getPhoneNumber(),
        address: professional.getAddress(),
        professional: {
          create: {
            professional_id: professional.getProfessionalId(),
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
        user_id: company.getUserId(),
        email: company.getEmail(),
        password: company.getPassword(),
        birth_date: company.getBirthDate(),
        role: company.getRole(),
        phone_number: company.getPhoneNumber(),
        address: company.getAddress(),
        company: {
          create: {
            company_id: company.getCompanyId(),
            cnpj: company.getCnpj(), fantasy_name: company.getFantasyName(),
            social_reason: company.getSocialReason(),
            segment: company.getSegment(),
            monthly_fee: company.getMonthlyFee(),
            commission: company.getCommission(),
            platform_1: company.getPlatform1(),
            platform_2: company.getPlatform2()
          }
        }
      }
    });
  }

  async getUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => new User(user.user_id, user.email, user.password, user.birth_date, user.role, user.phone_number ?? '', user.address ?? ''));
  }

  async getProfessionalByUserId(userId: string): Promise<Professional | null> {
    const professional = await this.prisma.professional.findUnique({
      where: { user_id: userId },
      include: {
        user: true
      }
    });
    if (!professional) return null;
    return new Professional(professional.professional_id, professional.user_id, professional.user.email, professional.user.password, professional.user.birth_date,
      professional.user.role, professional.user.phone_number ?? '', professional.user.address ?? '', professional.cpf, professional.name, professional.gender,
      professional.activity_area, professional.preferred_name ?? '', professional.professional_registration ?? '', professional.social_network ?? '', professional.desk ?? '');
  }

  async getById(userId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { user_id: userId },
    });
    if (!user) return null;
    return new User(user.user_id, user.email, user.password, user.birth_date, user.role, user.phone_number ?? '', user.address ?? '');
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        professional: true,
        company: true
      }
    });
    if (!user) return null;
    return new User(user.user_id, user.email, user.password, user.birth_date, user.role, user.phone_number ?? '', user.address ?? '');
  }

  async getByCpf(cpf: string): Promise<Professional | null> {
    const professional = await this.prisma.professional.findUnique({
      where: { cpf },
      include: {
        user: true
      }
    });
    if (!professional) return null;
    return new Professional(professional.professional_id, professional.user_id, professional.user.email, professional.user.password,
      professional.user.birth_date, professional.user.role, professional.user.phone_number ?? '', professional.user.address ?? '', professional.cpf,
      professional.name, professional.gender, professional.activity_area, professional.preferred_name ?? '',
      professional.professional_registration ?? '', professional.social_network ?? '', professional.desk ?? '');
  }

  async getByCnpj(cnpj: string): Promise<Company | null> {
    const company = await this.prisma.company.findUnique({
      where: { cnpj },
      include: {
        user: true
      }
    });
    if (!company) return null;
    return new Company(company.company_id, company.user.user_id, company.user.email, company.user.password, company.user.birth_date,
      company.user.role, company.user.phone_number ?? '', company.user.address ?? '', company.cnpj, company.fantasy_name, company.social_reason,
      company.segment, company.monthly_fee, company.commission, company.platform_1 ?? '', company.platform_2 ?? '');
  }

}
