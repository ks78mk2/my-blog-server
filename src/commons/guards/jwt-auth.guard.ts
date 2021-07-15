import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import HttpError from 'src/commons/exception/httpError';
import { TokenExpiredError, JsonWebTokenError, NotBeforeError } from 'jsonwebtoken'
import { IS_PUBLIC_KEY } from 'src/commons/guards/skip-auth.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector){
    super();
  }
  canActivate(context: ExecutionContext) { //public api는 허용 (token check 안함)
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info: Error) {
    
    if (info instanceof TokenExpiredError) {
      throw new HttpError(401, "토큰이 만료 되었습니다.", "0001")    
    } else if (info instanceof JsonWebTokenError) {
      throw new HttpError(401, "잘못된 토큰입니다.", "0002")    
    } else if (info) {
      throw new HttpError(401, "토큰이 존재하지 않습니다.", "0003")    
    }
    return user;
  }

}
