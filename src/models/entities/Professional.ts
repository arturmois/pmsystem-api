import { User } from "./User";
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export default class Professional extends User {
  private professionalId: string;
  private cpf: string;
  private name: string;
  private gender: string;
  private activityArea: string;
  private preferredName: string;
  private professionalRegistration: string;
  private socialNetwork: string;
  private desk: string;

  constructor(professionalId: string, userId: string, email: string, password: string, birthDate: Date,
    role: string, phoneNumber: string, address: string, cpf: string, name: string, gender: string, activityArea: string,
    preferredName: string, professionalRegistration: string, socialNetwork: string, desk: string) {
    super(userId, email, password, birthDate, role, phoneNumber, address);
    this.professionalId = professionalId;
    this.cpf = cpf;
    this.name = name;
    this.gender = gender;
    this.activityArea = activityArea;
    this.preferredName = preferredName;
    this.professionalRegistration = professionalRegistration;
    this.socialNetwork = socialNetwork;
    this.desk = desk;
  }

  static async createProfessional(email: string, password: string, birthDate: Date, role: string, phoneNumber: string,
    address: string, cpf: string, name: string, gender: string, activityArea: string, preferredName: string,
    professionalRegistration: string, socialNetwork: string, desk: string) {
    const professionalId = crypto.randomUUID();
    const userId = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Professional(professionalId, userId, email, hashedPassword, birthDate, role, phoneNumber, address, cpf,
      name, gender, activityArea, preferredName, professionalRegistration, socialNetwork, desk);
  }

  getProfessionalId() {
    return this.professionalId;
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

  getGender() {
    return this.gender;
  }

  getActivityArea() {
    return this.activityArea;
  }

  getProfessionalRegistration() {
    return this.professionalRegistration;
  }

  getSocialNetwork() {
    return this.socialNetwork;
  }

  getDesk() {
    return this.desk;
  }

}