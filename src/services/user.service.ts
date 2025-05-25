import { prisma } from "../config/database";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from "../repositories/UserRepository";
import { Professional } from "../models/Professional";
import Company from "../models/Company";

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export class UserService {

  constructor(private readonly userRepository: UserRepository) { }

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

  async getUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { user_id: userId }
    });
    if (!user) {
      throw new Error('User not found');
    }
    return {
      email: user.email,
      birthDate: user.birth_date,
      role: user.role,
    };
  }

  async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user) {
      throw new Error('User not found');
    }
    return {
      email: user.email,
      birthDate: user.birth_date,
      role: user.role,
    };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user) {
      throw new Error('User not found');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Invalid password');
    }
    const token = jwt.sign({ id: user.user_id }, JWT_SECRET, {
      expiresIn: '1d'
    });
    return token;
  }

}