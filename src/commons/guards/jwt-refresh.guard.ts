import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import HttpError from 'src/commons/exception/httpError';
import { TokenExpiredError, JsonWebTokenError, NotBeforeError } from 'jsonwebtoken'

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh-token') {
  constructor(){
    super();
  }

  handleRequest(err, user, info: Error) {
    if (info instanceof TokenExpiredError) {
      throw new HttpError(401, "Refresh 토큰이 만료 되었습니다.", "0001")    
    } else if (info instanceof JsonWebTokenError) {
      throw new HttpError(401, "잘못된 Refresh 토큰입니다.", "0002")
    } else if (info) {
      throw new HttpError(401, "Refresh 토큰이 존재하지 않습니다.", "0003")    
    }
    return user;
  }
}
