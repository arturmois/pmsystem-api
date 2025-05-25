import { User } from "./User";
import bcrypt from 'bcrypt';

export class Professional extends User {
  private name: string;
  private preferredName: string;
  private cpf: string;
  private type: string;
  private desk: string;

  constructor(userId: string, email: string, password: string, birthDate: Date, role: string, name: string, preferredName: string, cpf: string, type: string, desk: string) {
    super(userId, email, password, birthDate, role);
    this.name = name;
    this.preferredName = preferredName;
    this.cpf = cpf;
    this.type = type;
    this.desk = desk;
  }

  static async createProfessional(email: string, password: string, birthDate: Date, role: string, name: string, preferredName: string, cpf: string, type: string, desk: string) {
    const userId = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Professional(userId, email, hashedPassword, birthDate, role, name, preferredName, cpf, type, desk);
  }

  getName() {
    return this.name;
  }

  getPreferredName() {
    return this.preferredName;
  }

  getCpf() {
    return this.cpf;
  }

  getType() {
    return this.type;
  }

  getDesk() {
    return this.desk;
  }

}