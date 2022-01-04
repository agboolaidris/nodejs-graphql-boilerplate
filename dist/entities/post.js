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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const type_graphql_1 = require("type-graphql");
const uuid_1 = require("uuid");
const class_validator_1 = require("class-validator");
const User_1 = require("./User");
const typeorm_1 = require("typeorm");
let Post = class Post extends typeorm_1.BaseEntity {
    constructor(post) {
        super();
        Object.assign(this, post);
    }
    generateUUid() {
        this.uuid = (0, uuid_1.v4)();
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ unique: true }),
    (0, class_validator_1.Length)(6),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    (0, class_validator_1.Length)(100),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: "int" }),
    __metadata("design:type", Number)
], Post.prototype, "vote", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User),
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.posts),
    __metadata("design:type", User_1.User)
], Post.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Post.prototype, "imageURL", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Post.prototype, "updated_at", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Post.prototype, "created_at", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Post.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Post.prototype, "generateUUid", null);
Post = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Post);
exports.Post = Post;
//# sourceMappingURL=post.js.map