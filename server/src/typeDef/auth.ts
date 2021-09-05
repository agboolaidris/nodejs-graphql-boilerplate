import { Request, Response } from "express";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  telephone: string;

  @Field()
  role: string;
}
