import { UserService } from "../src/services/user.service";
import { UserRepository } from "../src/repositories/UserRepository";
import { prisma } from "../src/config/database";

let userService: UserService;

beforeEach(async () => {
  await prisma.professional.deleteMany();
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();
  const userRepository = new UserRepository();
  userService = new UserService(userRepository);
});

afterEach(async () => {
  await prisma.$disconnect();
});

test("should register a professional", async () => {
  const professional = {
    email: `test-${Math.random()}@test.com`,
    password: "123456",
    birthDate: "1990-01-01T00:00:00.000Z",
    role: "P",
    name: "John Doe",
    preferredName: "John",
    cpf: "12345678900",
    type: "P",
    desk: "12345678900",
  };

  await userService.registerProfessional(professional);

  const user = await userService.getUserByEmail(professional.email);
  expect(user).toBeTruthy();
  expect(user?.email).toBe(professional.email);
  expect(user?.birthDate).toEqual(new Date(professional.birthDate));
  expect(user?.role).toBe(professional.role);
});