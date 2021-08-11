import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    ) {}

  async validateUser(id: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(id);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password)
      if (isMatch) {
        const {password , ...result} = user;
        return result;
      } else {
        return null;
      }
    }
    return null;
    
  }

  async getCookieAccessToken(user: any) {
    const payload = { id: user.id, auth: user.auth_level };
    const token = await this.jwtService.sign(payload,{
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`});

    return {
      accessToken : token,
      domain: this.configService.get('COOKIE_DOMAIN'),
      path: '/',
      httpOnly: true,
      maxAge: Number(this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')) * 1000,
    } 
  }

  async getCookieRefreshToken(user: any) {
    const payload = { id: user.id, auth: user.auth_level };
    const token = await this.jwtService.sign(payload,{
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`});


    return {
      refreshToken : token,
      domain: this.configService.get('COOKIE_DOMAIN'),
      path: '/',
      httpOnly: true,
      maxAge: Number(this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')) * 1000,
    } 
  }

  async logout() {
    return {
      token : '',
      domain: this.configService.get('COOKIE_DOMAIN'),
      path: '/',
      httpOnly: true,
      maxAge: 0,
    };
  }
}