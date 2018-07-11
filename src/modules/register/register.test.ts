import { request } from "graphql-request";

import { AddressInfo } from "net";
import { startServer } from "../../startServer";
import { User } from "../../entity/User";

let getHost = () => "";

beforeAll(async () => {
  const app = await startServer();
  // Be explicit about the type in order to destructure without TS error
  const { port } = app.address() as AddressInfo;
  console.log("did port work?", port);
  getHost = () => `http://127.0.0.1:${port}`;
  console.log("getHost() ", getHost());
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
  const response = await request(getHost(), mutation);
  expect(response).toEqual({ register: true });
  const users = await User.find({ where: { email } });
  expect(users).toHaveLength(1);
  const user = users[0];
  expect(user.email).toEqual(email);
  expect(user.password).not.toEqual(password);
});
