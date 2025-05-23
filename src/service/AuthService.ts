import prisma from "../config/database";
import { RegisterProfessionalSchema } from "../model/schema/authSchema";
import User from "../model/User";
import UserRepository from "../repository/UserRepository";

export default class AuthService {

  static async registerProfessional(input: RegisterProfessionalSchema) {
    const user = User.create(input.email, input.password, input.birthDate, input.type);
    const userExists = await UserRepository.findByEmail(input.email);
    if (userExists) {
      throw new Error("User already exists");
    }
    await UserRepository.create(user);
    return { userId: user.getUserId() };
  }

}