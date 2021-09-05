import { RegisterInput } from "./../typeDef/auth";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export default class Auth {
  @Query(() => String)
  Hello() {
    return "Hell wolrd";
  }
}
