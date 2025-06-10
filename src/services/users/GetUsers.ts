import { inject } from '../../shared/di/DI';
import { PrismaClient } from '@prisma/client';
import { User } from '../../models/entities/User';
import type UserRepository from '../../repositories/UserRepository';

export default class GetUsers {
  @inject('prisma')
  private prisma: PrismaClient;
  @inject('userRepository')
  private userRepository!: UserRepository;

  async execute(): Promise<Output[]> {
    const users = await this.userRepository.getUsers();
    return users.map((user: User) => {
      return {
        userId: user.getUserId(),
        email: user.getEmail(),
        role: user.getRole(),
        birthDate: user.getBirthDate(),
        phoneNumber: user.getPhoneNumber() ?? null,
        address: user.getAddress() ?? null
      }
    })
  }

}


type Output = {
  userId: string;
  email: string;
  role: string;
  birthDate: Date;
  phoneNumber: string | null;
  address: string | null;
}

