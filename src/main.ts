import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.MY_BLOG_PORT);
  console.log(`Listen port : ${process.env.MY_BLOG_PORT}`)
}
bootstrap();
