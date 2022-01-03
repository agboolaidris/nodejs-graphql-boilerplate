import { Post } from "src/entities/post";
import { PostInput, PostResponse } from "src/types/post";
import { Arg, Mutation, Resolver, Ctx } from "type-graphql";
import { ContextType } from "src/types/@types";
import { validate } from "class-validator";

@Resolver()
export class PostResolver {
  @Mutation(() => PostResponse)
  async createPost(
    @Arg("options") body: PostInput,
    @Ctx() { req }: ContextType
  ): Promise<PostResponse> {
    try {
      const { title, content, imageURL } = body;
      if (!req.session.userInfo) throw new Error("not authenticated");
      console.log(req.session.userInfo);
      const post = new Post({ title, content, imageURL });
      const errors = await validate(post);
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
          error: map,
        };
      }

      return {
        ok: true,
      };
    } catch (error) {
      return {
        error: {
          server: error.message,
        },
      };
    }
  }
}
