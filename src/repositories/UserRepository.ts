import { PrismaClient } from "@prisma/client";
import Company from "../models/Company";
import Professional from "../models/Professional";
import { inject } from "../shared/di/DI";

export default class UserRepository {
  @inject('prisma')
  private prisma: PrismaClient;

  async createProfessional(professional: Professional) {
    await this.prisma.user.create({
      data: {
        email: professional.getEmail(),
        password: professional.getPassword(),
        birth_date: professional.getBirthDate(),
        role: professional.getRole(),
        professional: {
          create: {
            name: professional.getName(),
            preferred_name: professional.getPreferredName(),
            cpf: professional.getCpf(),
            type: professional.getType(),
            desk: professional.getDesk()
          }
        }
      },
      include: {
        professional: true
      }
    });
  }

  async createCompany(company: Company) {
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

}