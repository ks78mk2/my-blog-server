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
const common_1 = require("@nestjs/common");
let HttpError = class HttpError extends common_1.HttpException {
    constructor(status, message, code) {
        super('Forbidden', status);
        this.statusCode = 0;
        this.message = '';
        this.code = '0000';
        this.statusCode = status;
        this.message = message;
        this.code = code ? code : '0000';
    }
};
HttpError = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [Number, String, String])
], HttpError);
exports.default = HttpError;
//# sourceMappingURL=httpError.js.map