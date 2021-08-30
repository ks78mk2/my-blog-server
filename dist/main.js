"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const fs = require('fs');
const app_module_1 = require("./app.module");
const validationPipeError_1 = require("./commons/exception/validationPipeError");
const response_util_1 = require("./commons/util/response.util");
async function bootstrap() {
    let httpsOptions = {};
    if (process.env.SSL == 'true') {
        httpsOptions = {
            key: fs.readFileSync('/etc/ssl/cert/privkey1.pem'),
            cert: fs.readFileSync('/etc/ssl/cert/fullchain1.pem'),
        };
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule, Object.assign(Object.assign({}, httpsOptions), { cors: true }));
    app.use(cookieParser());
    app.useGlobalInterceptors(new response_util_1.TransformInterceptor());
    app.setGlobalPrefix('api/v1');
    app.use(helmet());
    app.useGlobalPipes(new validationPipeError_1._ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }));
    await app.listen(process.env.MY_BLOG_PORT);
    console.log(`listen port : ${process.env.MY_BLOG_PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map