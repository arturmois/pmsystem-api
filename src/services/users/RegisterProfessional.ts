import Professional from "../../models/entities/Professional";
import { inject } from "../../shared/di/DI";
import IUserRepository from "../../repositories/UserRepository";
import AppError from "../../shared/errors/AppError";

export default class RegisterProfessional {
  @inject('userRepository')
  private userRepository!: IUserRepository;

  async execute(input: Input): Promise<Output> {
    const professional = await Professional.createProfessional(input.email, input.password, input.birthDate, input.role,
      input.phoneNumber, input.address, input.cpf, input.name, input.gender, input.activityArea, input.preferredName,
      input.professionalRegistration, input.socialNetwork, input.desk);
    const userExists = await this.userRepository.getByEmail(input.email);
    if (userExists) {
      throw new AppError('User already exists', 400);
    }
    const professionalExists = await this.userRepository.getByCpf(input.cpf);
    if (professionalExists) {
      throw new AppError('Professional already exists', 400);
    }
    await this.userRepository.createProfessional(professional);
    return { userId: professional.getUserId() };
  }

}

type Input = {
  email: string;
  password: string;
  birthDate: Date;
  role: string;
  phoneNumber: string;
  address: string;
  cpf: string;
  name: string;
  gender: string;
  activityArea: string;
  preferredName: string;
  professionalRegistration: string;
  socialNetwork: string;
  desk: string;
}

type Output = {
  userId: string;
}
