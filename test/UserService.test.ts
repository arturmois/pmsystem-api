import UserRepository from "../src/repository/UserRepository";
import AuthService from "../src/service/AuthService";

test("should create a user", async () => {
  const input = {
    email: `test${Math.random()}@test.com`,
    password: "password",
    birthDate: new Date(),
    type: "E" as const
  };
  const user = await AuthService.registerProfessional(input);
  expect(user.userId).toBeDefined();
});
