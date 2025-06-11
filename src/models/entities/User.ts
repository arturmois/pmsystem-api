export class User {

  private userId: string;
  private email: string;
  private password: string;
  private birthDate: Date;
  private role: string;
  private phoneNumber?: string;
  private address?: string;

  constructor(userId: string, email: string, password: string, birthDate: Date, role: string, phoneNumber?: string, address?: string) {
    this.userId = userId;
    this.email = email;
    this.password = password;
    this.birthDate = birthDate;
    this.role = role;
    this.phoneNumber = phoneNumber ?? '';
    this.address = address ?? '';
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

  getPhoneNumber() {
    return this.phoneNumber;
  }

  getAddress() {
    return this.address;
  }

}
