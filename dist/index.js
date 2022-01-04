"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const post_1 = require("./resolver/post");
const user_1 = require("./resolver/user");
const url_1 = __importDefault(require("url"));
dotenv_1.default.config();
let RedisStore = (0, connect_redis_1.default)(express_session_1.default);
let redisClient = new ioredis_1.default();
if (process.env.REDISTOGO_URL) {
    var rtg = url_1.default.parse(process.env.REDISTOGO_URL, true);
    const port = rtg.port ? parseFloat(rtg.port) : undefined;
    const host = rtg.host ? rtg.host : undefined;
    const auth = ((_a = rtg.auth) === null || _a === void 0 ? void 0 : _a.split(":")[1]) ? rtg.auth.split(":")[1] : "";
    redisClient = new ioredis_1.default(port, host);
    redisClient.auth(auth);
}
const port = process.env.PORT || 5000;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        try {
            yield (0, typeorm_1.createConnection)();
            app.use((0, cors_1.default)({
                origin: [],
                credentials: true,
            }));
            app.use((0, express_session_1.default)({
                name: "auth-cookie",
                store: new RedisStore({
                    client: redisClient,
                    disableTTL: true,
                    disableTouch: true,
                }),
                saveUninitialized: false,
                secret: process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : "",
                cookie: {
                    maxAge: 1000 * 60 * 60 * 60 * 24 * 365,
                    secure: process.env.NODE_ENV !== "development",
                    httpOnly: true,
                    sameSite: "lax",
                },
                resave: false,
            }));
            const httpServer = http_1.default.createServer(app);
            const server = new apollo_server_express_1.ApolloServer({
                schema: yield (0, type_graphql_1.buildSchema)({
                    resolvers: [user_1.UserResolver, post_1.PostResolver],
                    validate: false,
                }),
                plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
                context: ({ req, res }) => ({ req, res, Redis: redisClient }),
            });
            yield server.start();
            server.applyMiddleware({ app, cors: false });
            yield new Promise((resolve) => httpServer.listen({ port }, resolve));
            console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
//# sourceMappingURL=index.js.map