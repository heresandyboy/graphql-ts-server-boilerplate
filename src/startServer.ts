import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";
import * as path from "path";

import { createTypeormConn } from "./utils/createTypeOrmConn";
import { resolvers } from "./resolvers";

export const startServer = async () => {
  const typeDefs = importSchema(path.join(__dirname, "./schema.graphql"));
  const port = process.env.NODE_ENV === "test" ? 0 : 4000;
  const server = new GraphQLServer({ typeDefs, resolvers });
  await createTypeormConn();
  const app = await server.start({
    port
  });
  console.log(`Server is running on localhost:${port}`);
  return app;
};
