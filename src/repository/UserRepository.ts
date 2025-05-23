import prisma from "../config/database";
import User from "../model/User";

export default class UserRepository {
  static async create(user: User): Promise<void> {
    await prisma.user.create({
      data: {
        user_id: user.getUserId(),
        email: user.getEmail(),
        password: user.getPassword(),
        birth_date: user.getBirthDate(),
        type: user.getType()
      }
    });
  }
  static async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return new User(user.user_id, user.email, user.password, user.birth_date, user.type);
  }
  static async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { user_id: id } });
    if (!user) return null;
    return new User(user.user_id, user.email, user.password, user.birth_date, user.type);
  }
}