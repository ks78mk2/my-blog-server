"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._ValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const httpError_1 = require("./httpError");
class _ValidationPipe extends common_1.ValidationPipe {
    async transform(value, metadata) {
        try {
            return await super.transform(value, metadata);
        }
        catch (e) {
            const message = e.response.message[0];
            if (e instanceof common_1.BadRequestException) {
                throw new httpError_1.default(400, `${message ? message : 'Parameter Validation Error!'}`, "0003");
            }
        }
    }
}
exports._ValidationPipe = _ValidationPipe;
//# sourceMappingURL=validationPipeError.js.map