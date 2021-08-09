import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export interface Response {
    statusCode: number;
    message: string | undefined;
    data: any;
    code: string | undefined;
}
export declare class TransformInterceptor<T> implements NestInterceptor<T, Response> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response> | any;
}
