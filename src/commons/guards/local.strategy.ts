import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import HttpError from 'src/commons/exception/httpError'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({usernameField : 'id', passwordField : "password"});
  }

  async validate(id: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(id, password);
    if (!user) {
      throw new HttpError(400 , '아이디 또는 비밀번호가 일치하지 않습니다.', '0001');
    }
    return user;
  }
}