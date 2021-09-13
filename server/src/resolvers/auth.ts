import bcrypt from "bcrypt";
import { User } from "./../entities/User";
import {
  RegisterInput,
  AuthResponse,
  LoginInput,
  ContextType,
  MeResponse,
} from "./../typeDef/auth";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { validate } from "class-validator";
import { exists } from "fs";

@Resolver()
export default class Auth {
  @Query(() => String)
  Hello() {
    return "Hell wolrd";
  }

  @Mutation(() => AuthResponse)
  async Register(
    @Arg("data", () => RegisterInput) data: RegisterInput
  ): Promise<AuthResponse> {
    try {
      const user = new User(data);

      const errors: any = {};
      if (data.password.trim() == "" || data.password.length < 7) {
        errors.password =
          "password is required and most be greater than 7 characters";
      }
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

  @Mutation(() => AuthResponse)
  async Login(
    @Arg("data", () => LoginInput) data: LoginInput,
    @Ctx() { res, req }: ContextType
  ): Promise<AuthResponse> {
    try {
      const { email, password } = data;
      const errors: any = {};
      if (email.trim() == "") {
        errors.email = "email is required";
      }

      if (password.trim() == "") {
        errors.password = "password is required";
      }

      if (Object.keys(errors).length > 0) {
        return {
          errors,
        };
      }

      //check if email address exist
      const user = await User.findOne({ email: email });
      if (!user)
        return {
          errors: {
            email: "email does not match",
          },
        };

      //compare password
      const confirmPassword = await bcrypt.compare(password, user.password);

      if (!confirmPassword)
        return {
          errors: {
            password: "password is invalid",
          },
        };

      req.session.user = {
        uuid: user.uuid,
        role: user.role,
      };
      return {
        msg: {
          msg: "user login successful",
        },
      };
    } catch (error) {
      return {
        errors: {
          email: "error occur",
        },
      };
    }
  }

  @Query(() => MeResponse)
  async Me(@Ctx() { req }: ContextType): Promise<MeResponse> {
    try {
      if (!req.session.user) {
        return {
          errors: {
            msg: "unauthorized, kindly login",
          },
        };
      }

      const user = await User.findOne({ uuid: req.session.user.uuid });
      if (!user) {
        return {
          errors: {
            msg: "unauthorized, kindly login",
          },
        };
      }

      return {
        data: user,
      };
    } catch (error) {}
  }
}
