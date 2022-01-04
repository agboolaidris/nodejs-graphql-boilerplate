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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const uuid_1 = require("uuid");
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entities/User");
const user_1 = require("../types/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const class_validator_1 = require("class-validator");
const user_2 = require("./../types/user");
const sendMail_1 = require("../utils/sendMail");
let UserResolver = class UserResolver {
    isme({ req }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.userInfo))
                    return null;
                return User_1.User.findOne(req.session.userInfo.id);
            }
            catch (error) {
                return null;
            }
        });
    }
    registerUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = new User_1.User(Object.assign(Object.assign({}, body), { role: "admin" }));
                const errors = yield (0, class_validator_1.validate)(user);
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
                        errors: map,
                    };
                }
                if (body.password !== body.confirmPassword) {
                    return {
                        errors: {
                            confirmPassword: "password not match",
                        },
                    };
                }
                yield user.save();
                return { msg: { msg: "user register" } };
            }
            catch (error) {
                if (error.code === "23505") {
                    if (error.detail.includes("email")) {
                        return {
                            errors: {
                                email: "email already exist",
                            },
                        };
                    }
                    if (error.detail.includes("username")) {
                        return {
                            errors: {
                                username: "username already exist",
                            },
                        };
                    }
                }
                return {
                    errors: {
                        server: error.message,
                    },
                };
            }
        });
    }
    loginUser({ req }, { email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findOne({ email });
                if (!user)
                    return {
                        errors: {
                            email: "email address is invalid",
                        },
                    };
                const compare_password = yield bcrypt_1.default.compare(password, user.password);
                if (!compare_password)
                    return {
                        errors: {
                            password: "password doesn't match",
                        },
                    };
                req.session.userInfo = {
                    id: user.id,
                    role: user.role,
                };
                return {
                    msg: {
                        msg: "login successful",
                    },
                };
            }
            catch (error) {
                return {
                    errors: {
                        server: error.message,
                    },
                };
            }
        });
    }
    logout({ req, res }) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = req.session.destroy(() => { });
            if (!response.userInfo) {
                return false;
            }
            else {
                res.clearCookie("auth-cookie");
                return true;
            }
        });
    }
    forgetpassword(email, { Redis }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findOne({ email });
                if (!user)
                    return false;
                const token = (0, uuid_1.v4)();
                const message = `
      <a href="${process.env.CLIENT_URL}/forget-password/${token}">Click to change your password</a>
      `;
                yield Redis.set(`forgetpassword-${token}`, user.id, "ex", 1000 * 60 * 60 * 24);
                const send = yield (0, sendMail_1.sendEmail)("iristech247@gmail.com", message, "Reset password");
                if (!send)
                    return false;
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    resetpassword({ Redis }, { password, token }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (password.length < 2)
                    return {
                        errors: {
                            password: "password most be greater than 2 character",
                        },
                    };
                const id = yield Redis.get(`forgetpassword-${token}`);
                if (!id)
                    return {
                        errors: {
                            password: "token expired",
                        },
                    };
                const user = yield User_1.User.findOne(id);
                if (!user)
                    return {
                        errors: {
                            password: "user not longer exist",
                        },
                    };
                user.password = yield bcrypt_1.default.hash(password, 10);
                yield user.save();
                yield Redis.del(`forgetpassword-${token}`);
                return {
                    msg: {
                        msg: "password change",
                    },
                };
            }
            catch (error) {
                return {
                    errors: {
                        server: error.message,
                    },
                };
            }
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "isme", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_2.RegisterResponse),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.RegisterInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "registerUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_2.LoginResponse),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("options")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_1.LoginInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "loginUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "logout", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "forgetpassword", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_1.ResetpasswordResponse),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("options")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_1.ResetpasswordInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "resetpassword", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map