import * as bcrypt from "bcryptjs";
import { IResolverMap } from "../../types/graphql-utils";
import { GQL } from "../../types/schema";
import { User } from "../../entity/User";

// import { IResolvers } from "graphql-yoga/dist/types";

// bug in ts > 2.6 and graphql cant use IResolvers to auto detemine the types
// IResolverMap is a workaround
// see here for latest: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/21359

export const resolvers: IResolverMap = {
  Query: {
    bye: () => "bye"
  },
  Mutation: {
    register: async (
      _,
      { email, password }: GQL.IRegisterOnMutationArguments
    ) => {
      const userAlreadyExists = await User.findOne({
        where: { email },
        select: ["id"]
      });

      // screw this - try @directives to handle pre-validation
      // I do like the error control though
      if (userAlreadyExists) {
        return [
          {
            path: "email",
            message: "already taken"
          }
        ];
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = User.create({
        email,
        password: hashedPassword
      });

      await user.save();
      return null;
    }
  }
};
