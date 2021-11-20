import { ContextType } from "../types/@types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "src/entities/User";
import { LoginInput, RegisterInput } from "src/types/user";
import bcrypt from "bcrypt";
import { validate } from "class-validator";
import { LoginResponse, RegisterResponse } from "./../types/user";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async isme(@Ctx() { req }: ContextType) {
    try {
      if (!req.session.userInfo) return null;
      console.log(req.session);
      return User.findOne(req.session.userInfo.id);
    } catch (error) {
      return null;
    }
  }

  @Mutation(() => RegisterResponse)
  async registerUser(
    @Arg("options") body: RegisterInput
  ): Promise<RegisterResponse> {
    try {
      const user = new User({ ...body, role: "admin" });

      const errors = await validate(user);
      if (errors.length > 1) {
        const map: any = {};
        errors.forEach((err) => {
          const key = err.property;

          if (err.constraints) {
            const value = Object.entries(err.constraints)[0][1];
            map[key] = value;
          }
        });

        return {
          errors: map,
        };
      }

      if (body.password !== body.confirmPassword) {
        return {
          errors: {
            confirmPassword: "password not match",
          },
        };
      }

      await user.save();
      return { msg: { msg: "user register" } };
    } catch (error) {
      if (error.code === "23505") {
        if (error.detail.includes("email")) {
          return {
            errors: {
              email: "email already exist",
            },
          };
        }

        if (error.detail.includes("username")) {
          return {
            errors: {
              username: "username already exist",
            },
          };
        }
      }
      return {
        errors: {
          server: error.message,
        },
      };
    }
  }

  @Mutation(() => LoginResponse)
  async loginUser(
    @Ctx() { req }: ContextType,
    @Arg("options") { email, password }: LoginInput
  ): Promise<LoginResponse> {
    try {
      const user = await User.findOne({ email });

      if (!user)
        return {
          errors: {
            email: "email address is invalid",
          },
        };

      const compare_password = await bcrypt.compare(password, user.password);

      if (!compare_password)
        return {
          errors: {
            password: "password doesn't match",
          },
        };
      req.session.userInfo = {
        id: user.id,
        role: user.role,
      };

      return {
        msg: {
          msg: "login successful",
        },
      };
    } catch (error) {
      return {
        errors: {
          server: error.message,
        },
      };
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: ContextType): Promise<boolean> {
    const destroy_session = await req.session.destroy();
    if (!destroy_session) return false;

    res.clearCookie("auth-cookie");
    return true;
  }
}
