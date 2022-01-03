import { Post } from "src/entities/post";
import { PostInput, PostResponse } from "src/types/post";
import { Arg, Mutation, Resolver, Ctx, UseMiddleware } from "type-graphql";
import { ContextType } from "src/types/@types";
import { validate } from "class-validator";
import { AuthMiddeware } from "src/middleware/auth";

@Resolver()
export class PostResolver {
  @Mutation(() => PostResponse)
  @UseMiddleware(AuthMiddeware)
  async createPost(
    @Arg("options") body: PostInput,
    @Ctx() { req }: ContextType
  ): Promise<PostResponse> {
    try {
      const { title, content, imageURL } = body;

      const post = new Post({
        title,
        content,
        imageURL,
        user: req.session.userInfo,
      });
      const errors = await validate(post);

      if (errors.length > 0) {
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

      await post.save();

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
