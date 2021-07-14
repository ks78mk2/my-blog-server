import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD  } from '@nestjs/core';
import CatchException from 'src/exception/CatchException';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: CatchException },
    { provide: APP_GUARD, useClass: JwtAuthGuard }
  ],
})
export class AppModule {}
