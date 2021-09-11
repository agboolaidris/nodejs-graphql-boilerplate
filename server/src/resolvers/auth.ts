import { User } from "./../entities/User";
import { RegisterInput, AuthResponse } from "./../typeDef/auth";
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

  @Mutation(() => AuthResponse)
  async Register(
    @Arg("data", () => RegisterInput) data: RegisterInput
  ): Promise<AuthResponse> {
    try {
      const user = new User(data);

      const errors: any = {};
      const validation = await validate(user);
      if (validation.length > 0) {
        validation.forEach((error) => {
          const key = error.property;
          const property = Object.entries(error.constraints)[0][1];
          errors[key] = property;
        });
        return { errors };
      }

      //check if email already exist
      const unqiueEmail = await User.findOne({ email: data.email });
      if (unqiueEmail) errors.email = "email already exist";

      //check if email already exist
      const unqiueName = await User.findOne({ name: data.name });
      if (unqiueName) errors.name = "name already exist";

      if (Object.keys(errors).length > 0) {
        return {
          errors,
        };
      }

      await user.save();
      return { msg: { msg: "jjjj" } };
    } catch (error) {
      console.log(error);
      return {
        errors: {
          email: "hhh",
        },
      };
    }
  }
}
