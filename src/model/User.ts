import crypto from "crypto";

export default class User {
  private userId: string;
  private email: string;
  private password: string;
  private birthDate: Date;
  private type: string;

  constructor(userId: string, email: string, password: string, birthDate: Date, type: string) {
    this.userId = userId;
    this.email = email;
    this.password = password;
    this.birthDate = birthDate;
    this.type = type;
  }

  static create(email: string, password: string, birthDate: Date, type: string) {
    const userId = crypto.randomUUID();
    return new User(userId, email, password, birthDate, type);
  }

  getUserId() {
    return this.userId;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  getBirthDate() {
    return this.birthDate;
  }

  getType() {
    return this.type;
  }
}