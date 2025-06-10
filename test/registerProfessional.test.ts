import UserRepository from "../src/repositories/UserRepository";
import prisma from "../src/config/database";
import RegisterProfessional from "../src/services/users/RegisterProfessional";
import { Registry } from "../src/shared/di/DI";

let registerProfessional: RegisterProfessional;
let userRepository: UserRepository;

beforeEach(async () => {
  await prisma.professional.deleteMany();
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();
  Registry.getInstance().provide('prisma', prisma);
  userRepository = new UserRepository();
  Registry.getInstance().provide('userRepository', userRepository);
  registerProfessional = new RegisterProfessional();
});

afterEach(async () => {
  await prisma.$disconnect();
});

test("should register a professional", async () => {
  const professional = {
    email: `test-${Math.random()}@test.com`,
    password: "123456",
    birthDate: new Date("1990-01-01T00:00:00.000Z"),
    role: "P",
    phoneNumber: "12345678900",
    address: "Street 123",
    cpf: "12345678900",
    name: "John Doe",
    gender: "M",
    activityArea: "Paisagismo",
    preferredName: "John",
    professionalRegistration: "12345678900",
    socialNetwork: "https://www.linkedin.com/in/john-doe-12345678900",
    desk: "Desk 123"
  };

  await registerProfessional.execute(professional);

  const user = await userRepository.findByEmail(professional.email);
  expect(user).toBeTruthy();
  expect(user?.getEmail()).toBe(professional.email);
  expect(user?.getBirthDate()).toEqual(professional.birthDate);
  expect(user?.getRole()).toBe(professional.role);
  expect(user?.getPhoneNumber()).toBe(professional.phoneNumber);
  expect(user?.getAddress()).toBe(professional.address);
});