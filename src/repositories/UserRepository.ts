import { prisma } from "../config/database";
import Company from "../models/Company";
import { Professional } from "../models/Professional";

export class UserRepository {
  constructor() { }

  async createProfessional(professional: Professional) {
    await prisma.user.create({
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
    await prisma.user.create({
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