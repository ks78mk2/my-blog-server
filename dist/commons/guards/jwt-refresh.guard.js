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
exports.JwtRefreshGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const httpError_1 = require("../exception/httpError");
const jsonwebtoken_1 = require("jsonwebtoken");
let JwtRefreshGuard = class JwtRefreshGuard extends passport_1.AuthGuard('jwt-refresh-token') {
    constructor() {
        super();
    }
    handleRequest(err, user, info) {
        if (info instanceof jsonwebtoken_1.TokenExpiredError) {
            throw new httpError_1.default(401, "Refresh 토큰이 만료 되었습니다.", "0001");
        }
        else if (info instanceof jsonwebtoken_1.JsonWebTokenError) {
            throw new httpError_1.default(401, "잘못된 Refresh 토큰입니다.", "0002");
        }
        else if (info) {
            throw new httpError_1.default(401, "Refresh 토큰이 존재하지 않습니다.", "0003");
        }
        return user;
    }
};
JwtRefreshGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], JwtRefreshGuard);
exports.JwtRefreshGuard = JwtRefreshGuard;
//# sourceMappingURL=jwt-refresh.guard.js.map