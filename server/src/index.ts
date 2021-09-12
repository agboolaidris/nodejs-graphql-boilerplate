import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { buildSchema } from "type-graphql";
import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";

//resolver
import AuthResolver from "./resolvers/auth";

async function Main() {
  const app = express();
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  app.use(
    session({
      name: "token",
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 360 * 10,
      },
      saveUninitialized: false,
      secret: "dhdhddjsssbsbsjssjjjssbssssjjsjssbbbs",
      resave: false,
    })
  );

  app.use(
    cors({
      credentials: true,
      origin: "*",
    })
  );

  const httpServer = http.createServer(app);

  try {
    await createConnection();
    const server = new ApolloServer({
      schema: await buildSchema({
        resolvers: [AuthResolver],
        validate: false,
      }),
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
      context: ({ req, res }: { req: Request; res: Response }) => {
        return {
          req,
          res,
        };
      },
    });

    await server.start();
    server.applyMiddleware({ app });
    httpServer.listen({ port: 4000 }, () => {
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      );
    });
  } catch (error) {
    console.log(error);
  }
}

Main();
