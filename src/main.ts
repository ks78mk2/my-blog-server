import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
// const fs = require('fs');
import { AppModule } from './app.module';
import { _ValidationPipe } from './commons/exception/validationPipeError';
import { TransformInterceptor } from './commons/util/response.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(cookieParser());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.setGlobalPrefix('api/v1');
  app.use(helmet());
  // app.use(csurf());
  app.useGlobalPipes(new _ValidationPipe({
    whitelist : true,
    forbidNonWhitelisted : true,
    transform: true
  }))
  await app.listen(process.env.MY_BLOG_PORT);
  console.log(`listen port : ${process.env.MY_BLOG_PORT}`)
}
bootstrap();
