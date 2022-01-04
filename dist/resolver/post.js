"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostResolver = void 0;
const post_1 = require("../entities/post");
const typeorm_1 = require("typeorm");
const post_2 = require("../types/post");
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
const auth_1 = require("../middleware/auth");
const User_1 = require("../entities/User");
let PostResolver = class PostResolver {
    createPost(body, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, content, imageURL } = body;
                const user = yield User_1.User.findOneOrFail({ id: req.session.userInfo.id });
                const post = new post_1.Post({
                    title,
                    content,
                    imageURL,
                    user,
                });
                const errors = yield (0, class_validator_1.validate)(post);
                if (errors.length > 0) {
                    const map = {};
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
                yield post.save();
                return {
                    ok: true,
                };
            }
            catch (error) {
                if (error.code === "23505") {
                    if (error.detail.includes("title")) {
                        return {
                            error: {
                                title: "title already exist",
                            },
                        };
                    }
                }
                return {
                    error: {
                        server: error.message,
                    },
                };
            }
        });
    }
    posts(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield (0, typeorm_1.getRepository)(post_1.Post)
                    .createQueryBuilder("post")
                    .orderBy("post.created_at", "DESC")
                    .leftJoinAndSelect("post.user", "user")
                    .take(Math.min(limit ? limit : 50))
                    .getMany();
                return posts;
            }
            catch (error) {
                return null;
            }
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => post_2.PostResponse),
    (0, type_graphql_1.UseMiddleware)(auth_1.AuthMiddeware),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_2.PostInput, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
__decorate([
    (0, type_graphql_1.Query)(() => [post_1.Post]),
    __param(0, (0, type_graphql_1.Arg)("limit", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "posts", null);
PostResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=post.js.map