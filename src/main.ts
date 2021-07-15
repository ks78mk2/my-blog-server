import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { _ValidationPipe } from './exception/validationPipeError';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new _ValidationPipe({
    whitelist : true,
    forbidNonWhitelisted : true,
    transform: true
  }))
  await app.listen(process.env.MY_BLOG_PORT);
  console.log(`listen port : ${process.env.MY_BLOG_PORT}`)
}
bootstrap();
