import UserRepository from "../src/repositories/UserRepository";
import prisma from "../src/config/database";
import RegisterCompany from "../src/services/users/RegisterCompany";
import { Registry } from "../src/shared/di/DI";

let registerCompany: RegisterCompany;
let userRepository: UserRepository;

beforeEach(async () => {
  await prisma.professional.deleteMany();
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();
  Registry.getInstance().provide('prisma', prisma);
  userRepository = new UserRepository();
  Registry.getInstance().provide('userRepository', userRepository);
  registerCompany = new RegisterCompany();
});

afterEach(async () => {
  await prisma.$disconnect();
});

test("should register a company", async () => {
  const company = {
    email: `test-${Math.random()}@test.com`,
    password: "123456",
    birthDate: new Date("1990-01-01T00:00:00.000Z"),
    role: "C",
    phoneNumber: "12345678900",
    address: "Rua 123",
    cnpj: "12345678900",
    fantasyName: "John Doe",
    socialReason: "John Doe",
    segment: "Paisagismo",
    monthlyFee: 100,
    commission: 10,
    platform1: "https://www.linkedin.com/in/john-doe-12345678900",
    platform2: "https://www.linkedin.com/in/john-doe-12345678900"
  };

  await registerCompany.execute(company);

  const user = await userRepository.findByEmail(company.email);
  expect(user).toBeTruthy();
  expect(user?.getEmail()).toBe(company.email);
  expect(user?.getBirthDate()).toEqual(new Date(company.birthDate));
  expect(user?.getRole()).toBe(company.role);
});