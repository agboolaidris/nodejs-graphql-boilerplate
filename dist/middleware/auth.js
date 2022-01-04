"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddeware = void 0;
const AuthMiddeware = ({ context }, Next) => {
    if (!context.req.session.userInfo)
        throw new Error("access denied, unauthenticated");
    return Next();
};
exports.AuthMiddeware = AuthMiddeware;
//# sourceMappingURL=auth.js.map