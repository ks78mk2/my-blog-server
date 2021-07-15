import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
    ) {}

  async validateUser(id: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(id);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    console.log(user);
    const payload = { id: user.id, password: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}