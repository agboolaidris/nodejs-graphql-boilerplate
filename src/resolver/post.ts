import { PostInput, PostResponse } from "src/types/post";
import { Arg, Mutation, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
  @Mutation(() => PostResponse)
  async createPost(@Arg("options") body: PostInput): Promise<PostResponse> {
    try {
      // const { title, content, imageURL } = body;
      console.log(body);
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
