const rootDir = process.env.NODE_ENV === "production" ? "src" : "dist";

module.exports = {
  name: "default",
  type: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: [rootDir + "/entities/**/*{.ts,.js}"],
  migrations: [rootDir + "/migrations/**/*{.ts,.js}"],
  subscribers: [rootDir + "/subscribers/**/*{.ts,.js}"],
  cli: {
    entitiesDir: rootDir + "/entities",
    migrationsDir: rootDir + "/migrations",
    subscribersDir: rootDir + "/subscribers",
  },
};
