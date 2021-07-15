import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  await app.listen(process.env.MY_BLOG_PORT);
  console.log(`listen port : ${process.env.MY_BLOG_PORT}`)
}
bootstrap();
