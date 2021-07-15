import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD  } from '@nestjs/core';
import CatchException from 'src/exception/catchException';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
const Joi = require('@hapi/joi');

@Module({
  imports: [
    UserModule, 
    AuthModule, 
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_ACCESS_TOKEN_SECRET :Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME :Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET :Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME :Joi.string().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: CatchException },
    { provide: APP_GUARD, useClass: JwtAuthGuard }
  ],
})
export class AppModule {}
