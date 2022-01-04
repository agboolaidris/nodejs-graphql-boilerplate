import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { buildSchema, Field, ObjectType } from "type-graphql";
import express from "express";
import http from "http";
import cors from "cors";
import { Query, Resolver } from "type-graphql";

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

@ObjectType()
class Book {
  @Field()
  title: String;
  @Field()
  author: String;
}

@Resolver()
class UserResolver {
  @Query(() => [Book])
  books() {
    return books;
  }
}

async function main() {
  const app = express();
  try {
    app.use(
      cors({
        origin: "*",
        credentials: true,
      })
    );
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
      schema: await buildSchema({
        resolvers: [UserResolver],
        validate: false,
      }),
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();
    server.applyMiddleware({ app, cors: false });
    await new Promise<void>((resolve) =>
      httpServer.listen({ port: process.env.PORT || 8080 }, resolve)
    );
    console.log(
      `🚀 Server ready at http://localhost:8080/${server.graphqlPath}`
    );
  } catch (error) {
    console.log(error);
  }
}

main();
