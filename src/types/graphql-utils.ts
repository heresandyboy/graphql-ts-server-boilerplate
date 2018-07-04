// workaround for bug in resolvers.ts - see link for latest:
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/21359

export interface IResolverMap {
  [key: string]: {
    [key: string]: (parent: any, args: any, context: {}, info: any) => any;
  };
}
