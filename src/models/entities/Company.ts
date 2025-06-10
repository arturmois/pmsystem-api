import bcrypt from "bcrypt";
import { User } from "./User";

export default class Company extends User {
  private companyId: string;
  private cnpj: string;
  private fantasyName: string;
  private socialReason: string;
  private segment: string;
  private monthlyFee: number;
  private commission: number;
  private platform1: string;
  private platform2: string;

  constructor(companyId: string, userId: string, email: string, password: string, birthDate: Date,
    role: string, phoneNumber: string, address: string, cnpj: string, fantasyName: string, socialReason: string, segment: string, monthlyFee: number, commission: number, platform1: string, platform2: string) {
    super(userId, email, password, birthDate, role, phoneNumber, address);
    this.companyId = companyId;
    this.cnpj = cnpj;
    this.fantasyName = fantasyName;
    this.socialReason = socialReason;
    this.segment = segment;
    this.monthlyFee = monthlyFee;
    this.commission = commission;
    this.platform1 = platform1;
    this.platform2 = platform2;
  }

  static async createCompany(email: string, password: string, birthDate: Date, role: string, phoneNumber: string, address: string, cnpj: string, fantasyName: string, socialReason: string, segment: string, monthlyFee: number, commission: number, platform1: string, platform2: string) {
    const companyId = crypto.randomUUID();
    const userId = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Company(companyId, userId, email, hashedPassword, birthDate, role, phoneNumber, address, cnpj, fantasyName, socialReason, segment, monthlyFee, commission, platform1, platform2);
  }

  getCompanyId() {
    return this.companyId;
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

  getPlatform1() {
    return this.platform1;
  }

  getPlatform2() {
    return this.platform2;
  }
}