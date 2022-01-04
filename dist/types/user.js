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
exports.ResetpasswordResponse = exports.LoginResponse = exports.RegisterResponse = exports.ResetpasswordInput = exports.LoginInput = exports.RegisterInput = void 0;
const type_graphql_1 = require("type-graphql");
let MsgType = class MsgType {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], MsgType.prototype, "msg", void 0);
MsgType = __decorate([
    (0, type_graphql_1.ObjectType)()
], MsgType);
let RegisterInput = class RegisterInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "confirmPassword", void 0);
RegisterInput = __decorate([
    (0, type_graphql_1.InputType)()
], RegisterInput);
exports.RegisterInput = RegisterInput;
let LoginInput = class LoginInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginInput.prototype, "password", void 0);
LoginInput = __decorate([
    (0, type_graphql_1.InputType)()
], LoginInput);
exports.LoginInput = LoginInput;
let ResetpasswordInput = class ResetpasswordInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ResetpasswordInput.prototype, "token", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ResetpasswordInput.prototype, "password", void 0);
ResetpasswordInput = __decorate([
    (0, type_graphql_1.InputType)()
], ResetpasswordInput);
exports.ResetpasswordInput = ResetpasswordInput;
let RegisterError = class RegisterError {
};
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RegisterError.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RegisterError.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RegisterError.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RegisterError.prototype, "confirmPassword", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RegisterError.prototype, "server", void 0);
RegisterError = __decorate([
    (0, type_graphql_1.ObjectType)()
], RegisterError);
let RegisterResponse = class RegisterResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => RegisterError, { nullable: true }),
    __metadata("design:type", RegisterError)
], RegisterResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => MsgType, { nullable: true }),
    __metadata("design:type", MsgType)
], RegisterResponse.prototype, "msg", void 0);
RegisterResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], RegisterResponse);
exports.RegisterResponse = RegisterResponse;
let LoginError = class LoginError {
};
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], LoginError.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], LoginError.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], LoginError.prototype, "server", void 0);
LoginError = __decorate([
    (0, type_graphql_1.ObjectType)()
], LoginError);
let LoginResponse = class LoginResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => LoginError, { nullable: true }),
    __metadata("design:type", LoginError)
], LoginResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => MsgType, { nullable: true }),
    __metadata("design:type", MsgType)
], LoginResponse.prototype, "msg", void 0);
LoginResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], LoginResponse);
exports.LoginResponse = LoginResponse;
let ResetpasswordError = class ResetpasswordError {
};
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ResetpasswordError.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ResetpasswordError.prototype, "server", void 0);
ResetpasswordError = __decorate([
    (0, type_graphql_1.ObjectType)()
], ResetpasswordError);
let ResetpasswordResponse = class ResetpasswordResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => ResetpasswordError, { nullable: true }),
    __metadata("design:type", ResetpasswordError)
], ResetpasswordResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => MsgType, { nullable: true }),
    __metadata("design:type", MsgType)
], ResetpasswordResponse.prototype, "msg", void 0);
ResetpasswordResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], ResetpasswordResponse);
exports.ResetpasswordResponse = ResetpasswordResponse;
//# sourceMappingURL=user.js.map