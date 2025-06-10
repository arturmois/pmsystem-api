import bcrypt from "bcrypt";
import { User } from "./User";

export default class Company extends User {
  private cnpj: string;
  private fantasyName: string;
  private socialReason: string;
  private segment: string;
  private monthlyFee: number;
  private commission: number;

  constructor(userId: string, email: string, password: string, birthDate: Date, role: string, cnpj: string, address: string, fantasyName: string, socialReason: string, segment: string, monthlyFee: number, commission: number) {
    super(userId, email, password, birthDate, role);
    this.cnpj = cnpj;
    this.fantasyName = fantasyName;
    this.socialReason = socialReason;
    this.segment = segment;
    this.monthlyFee = monthlyFee;
    this.commission = commission;
  }

  static async createCompany(email: string, password: string, birthDate: Date, role: string, cnpj: string, address: string, fantasyName: string, socialReason: string, segment: string, monthlyFee: number, commission: number) {
    const userId = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Company(userId, email, hashedPassword, birthDate, role, cnpj, address, fantasyName, socialReason, segment, monthlyFee, commission);
  }

  getCnpj() {
    return this.cnpj;
  }

  getFantasyName() {
    return this.fantasyName;
  }

  getSocialReason() {
    return this.socialReason;
  }

  getSegment() {
    return this.segment;
  }

  getMonthlyFee() {
    return this.monthlyFee;
  }

  getCommission() {
    return this.commission;
  }

}