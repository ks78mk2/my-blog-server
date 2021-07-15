import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import HttpError from 'src/commons/exception/httpError';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    handleRequest(err, user, info: Error) {
        if (err){
            throw err
        }
        
        if (info) {
            throw new HttpError(400, info.message, "0001");
        }
        return user;
    }    
}