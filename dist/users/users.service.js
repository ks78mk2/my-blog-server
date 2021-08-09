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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../model/user/user.entity");
const typeorm_2 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const httpError_1 = require("../commons/exception/httpError");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findOne(id) {
        const result = await this.userRepository.findOne({ id });
        return result;
    }
    async create(userData) {
        try {
            const user = new user_entity_1.User();
            user.id = userData.id;
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(userData.password, salt);
            user.auth_level = userData.auth_level;
            const result = await this.userRepository.insert(user);
            return result;
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) === "ER_DUP_ENTRY") {
                throw new httpError_1.default(400, "아이디가 중복되었습니다.", "0001");
            }
        }
    }
    async delete(id) {
        return await this.userRepository.delete({ id });
    }
    async update_refreshToken(refreshToken, id) {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.userRepository.update(id, { refresh_token: hashedRefreshToken });
    }
    async getUserIfRefreshTokenMatches(refreshToken, id) {
        const user = await this.findOne(id);
        const isRefreshTokenMatching = await bcrypt.compare(refreshToken, user.refresh_token);
        if (isRefreshTokenMatching) {
            return user;
        }
    }
    async deleteRefreshToken(id) {
        return this.userRepository.update(id, { refresh_token: null });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=users.service.js.map