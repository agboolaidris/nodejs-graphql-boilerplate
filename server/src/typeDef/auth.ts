import { Request, Response } from "express";
import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class RegisterInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  telephone: string;

  @Field()
  role: "admin" | "user";

  @Field()
  password: string;
}

@ObjectType()
class ErrorType {
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => String, { nullable: true })
  telephone?: string;

  @Field(() => String, { nullable: true })
  role?: string;
}

@ObjectType()
class MsgType {
  @Field()
  msg: string;
}

@ObjectType()
export class AuthResponse {
  @Field(() => ErrorType, { nullable: true })
  errors?: ErrorType;

  @Field(() => MsgType, { nullable: true })
  msg?: MsgType;
}
