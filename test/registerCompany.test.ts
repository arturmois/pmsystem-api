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

test("should register a company", async () => {
  const company = {
    email: `test-${Math.random()}@test.com`,
    password: "123456",
    birthDate: "1990-01-01T00:00:00.000Z",
    role: "C",
    cnpj: "12345678900",
    address: "Rua 123",
    fantasyName: "John Doe",
    socialReason: "John Doe",
    segment: "Paisagismo",
    monthlyFee: 100,
    commission: 10,
  };

  await userService.registerCompany(company);

  const user = await userService.getUserByEmail(company.email);
  expect(user).toBeTruthy();
  expect(user?.email).toBe(company.email);
  expect(user?.birthDate).toEqual(new Date(company.birthDate));
  expect(user?.role).toBe(company.role);
});