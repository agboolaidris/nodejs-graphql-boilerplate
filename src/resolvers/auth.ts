import { User } from "./../entities/User";
import { RegisterInput } from "./../typeDef/auth";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { validate } from "class-validator";

@Resolver()
export default class Auth {
  @Query(() => String)
  Hello() {
    return "Hell wolrd";
  }

  @Query(() => [User], { nullable: true })
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  @Mutation(() => User, { nullable: true })
  async Register(
    @Arg("data", () => RegisterInput) data: RegisterInput
  ): Promise<User> {
    try {
      const user = new User(data);
      const errors = await validate(user);
      // if (errors.length > 0) {
      //   console.log(errors);
      // }
      await user.save();
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
