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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const local_auth_guard_1 = require("../commons/guards/local-auth.guard");
const auth_service_1 = require("./auth.service");
const skip_auth_decorator_1 = require("../commons/guards/skip-auth.decorator");
const login_dto_1 = require("./dto/login.dto");
const users_service_1 = require("../users/users.service");
const jwt_refresh_guard_1 = require("../commons/guards/jwt-refresh.guard");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async login(req, userinfo, res) {
        console.log(req.user);
        const _a = await this.authService.getCookieAccessToken(req.user), { accessToken } = _a, accessOption = __rest(_a, ["accessToken"]);
        const _b = await this.authService.getCookieRefreshToken(req.user), { refreshToken } = _b, refreshOption = __rest(_b, ["refreshToken"]);
        await this.userService.update_refreshToken(refreshToken, userinfo.id);
        res.cookie('Authentication', accessToken, accessOption);
        res.cookie('Refresh', refreshToken, refreshOption);
        return { result: { id: req.user.id, name: req.user.name, auth_level: req.user.auth_level } };
    }
    async logout(req, res) {
        const _a = await this.authService.logout(), { token } = _a, option = __rest(_a, ["token"]);
        await this.userService.deleteRefreshToken(req.user.id);
        res.cookie('Authentication', token, option);
        res.cookie('Refresh', token, option);
        return { result: `logout` };
    }
    async refresh(req, res) {
        const user = req.user;
        const _a = await this.authService.getCookieAccessToken(user.id), { accessToken } = _a, accessOption = __rest(_a, ["accessToken"]);
        res.cookie('Authentication', accessToken, accessOption);
        return { result: `refresh` };
    }
};
__decorate([
    skip_auth_decorator_1.Public(),
    common_1.UseGuards(local_auth_guard_1.LocalAuthGuard),
    common_1.Post('/login'),
    __param(0, common_1.Req()),
    __param(1, common_1.Body()),
    __param(2, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    skip_auth_decorator_1.Public(),
    common_1.UseGuards(jwt_refresh_guard_1.JwtRefreshGuard),
    common_1.Post('/logout'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    skip_auth_decorator_1.Public(),
    common_1.UseGuards(jwt_refresh_guard_1.JwtRefreshGuard),
    common_1.Get('/refresh'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UserService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map