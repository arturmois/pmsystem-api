import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { inject } from '../../shared/di/DI';
import { PrismaClient } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default class AuthService {

  @inject('prisma')
  private prisma: PrismaClient;

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });
    if (!user) {
      throw new Error('User not found');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Invalid password');
    }
    const token = jwt.sign({ id: user.user_id }, JWT_SECRET, {
      expiresIn: '1d'
    });
    return token;
  }

}