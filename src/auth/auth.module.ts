import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../commons/guards/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../commons/guards/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtRefreshStrategy } from 'src/commons/guards/jwt-refresh.strategy';
import { UserService } from 'src/users/users.service';
import { AuthController } from './auth.controller';


@Module({
  imports: [
    UserModule, 
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`,
        },
      }),
    }),
  ],
  providers: [
    AuthService, 
    LocalStrategy, 
    JwtStrategy, 
    ConfigService, 
    JwtRefreshStrategy
  ],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
