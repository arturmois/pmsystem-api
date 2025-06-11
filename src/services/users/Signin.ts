import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject } from '../../shared/di/DI';
import { PrismaClient } from '@prisma/client';
import AppError from '../../shared/errors/AppError';
import { JWT_SECRET } from '../../config/env';

export default class Signin {
  @inject('prisma')
  private prisma: PrismaClient;

  async execute(input: Input): Promise<Output> {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email }
    });
    if (!user) {
      throw new AppError('User not found', 404);
    }
    const validPassword = await bcrypt.compare(input.password, user.password);
    if (!validPassword) {
      throw new AppError('Invalid password', 401);
    }
    const token = sign({ userId: user.user_id, email: user.email }, JWT_SECRET as string, {
      expiresIn: '1d',
    });
    return { token };
  }

}

type Input = {
  email: string;
  password: string;
}

type Output = {
  token: string;
}

