import User from "../src/model/User";

test("Should create a user", () => {
  const user = User.create(`john.doe${Math.random()}@example.com`, "password", new Date(), "E");
  expect(user.getUserId()).toBeDefined();
  expect(user.getEmail()).toBe(user.getEmail());
  expect(user.getPassword()).toBe(user.getPassword());
  expect(user.getBirthDate()).toBe(user.getBirthDate());
  expect(user.getType()).toBe(user.getType());
});