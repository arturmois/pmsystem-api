export class User {

  private userId: string;
  private email: string;
  private password: string;
  private birthDate: Date;
  private role: string;

  constructor(userId: string, email: string, password: string, birthDate: Date, role: string) {
    this.userId = userId;
    this.email = email;
    this.password = password;
    this.birthDate = birthDate;
    this.role = role;
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

  getRole() {
    return this.role;
  }

}