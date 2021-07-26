import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
    ) {}

  async validateUser(id: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(id);
    if (user) {
      const isMatch = await bcrypt.compare(user.password, password)
      if (isMatch) {
        const {password , ...result} = user;
        return result;
      }
    }    
    return null;
  }

  async signIn(user: any) {
    console.log(user);
    const payload = { id: user.id, auth: user.auth_level };
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }
}