import { importSchema } from "graphql-import";
import { GraphQLServer } from "graphql-yoga";
import { mergeSchemas, makeExecutableSchema } from "graphql-tools";
import { GraphQLSchema } from "graphql";
import * as path from "path";
import * as fs from "fs";

import { createTypeormConn } from "./utils/createTypeOrmConn";

const port = process.env.NODE_ENV === "test" ? 0 : 4000;

export const startServer = async () => {
  const schemas: GraphQLSchema[] = [];
  const folders = fs.readdirSync(path.join(__dirname, "./modules"));

  folders.forEach(folder => {
    const { resolvers } = require(`./modules/${folder}/resolvers.ts`);
    const typeDefs = importSchema(
      path.join(__dirname, `./modules/${folder}/schema.graphql`)
    );

    console.log(typeDefs);

    schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
  });

  const server = new GraphQLServer({ schema: mergeSchemas({ schemas }) });

  await createTypeormConn();

  const app = await server.start({
    port
  });

  console.log(`Server is running on localhost:${port}`);
  return app;
};
