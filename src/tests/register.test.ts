import { request } from "graphql-request";

import { host } from "./constants";
import { User } from "../entity/User";
import { startServer } from "../startServer";

let getHost = () => "";

beforeAll(async () => {
  const app = await startServer();
  const port = app.address();

  getHost = () => `http://127.0.0.1:${port}`;
});

const email = "tom@bob.com";
const password = "jalksdf";

// TODO: for integration tests can we use the real mutations imported from a graphql file?
const mutation = `
mutation {
  register(email: "${email}", password: "${password}")
}
`;

test("Register user", async () => {
  const response = await request(host, mutation);
  expect(response).toEqual({ register: true });
  const users = await User.find({ where: { email } });
  expect(users).toHaveLength(1);
  const user = users[0];
  expect(user.email).toEqual(email);
  expect(user.password).not.toEqual(password);
});

// rules

// use a test database
// drop all data once the test is over
// when I run yarn test it should start a server ?? -- unless can stop it as mentioned in the comments
