import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD  } from '@nestjs/core';
import CatchException from 'src/commons/exception/catchException';
import { JwtAuthGuard } from './commons/guards/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
const Joi = require('@hapi/joi');

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_ACCESS_TOKEN_SECRET :Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME :Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET :Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME :Joi.string().required(),
        MYSQL_HOST :Joi.string().required(),
        COOKIE_DOMAIN :Joi.string().required(),
      }),
    }),
    UserModule, 
    AuthModule,     
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: CatchException },
    { provide: APP_GUARD, useClass: JwtAuthGuard }
  ],
})
export class AppModule {}
