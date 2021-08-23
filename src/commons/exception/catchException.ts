// CatchException.ts
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from 'express';
import { CannotCreateEntityIdMapError, EntityNotFoundError, QueryFailedError } from "typeorm";
import HttpError from "./httpError";
import { HttpErrorDto } from "./httpError.dto";


@Catch()
export default class CatchException implements ExceptionFilter {
  // ExceptionFilter 인터페이스를 구현해야 하는 함수
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let message = (exception as any).message.message;
    let code = '9999';

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    console.log((exception as any));
    switch (exception.constructor) {
      case HttpException:          
          status = (exception as HttpException).getStatus();
          break;

      case QueryFailedError:  // this is a TypeOrm error
          status = HttpStatus.UNPROCESSABLE_ENTITY
          message = (exception as QueryFailedError).message;
          code = (exception as any).code;
          break;

      case EntityNotFoundError:  // this is another TypeOrm error
          status = HttpStatus.UNPROCESSABLE_ENTITY
          message = (exception as EntityNotFoundError).message;
          code = (exception as any).code;
          break;

      case CannotCreateEntityIdMapError: // and another
          status = HttpStatus.UNPROCESSABLE_ENTITY
          message = (exception as CannotCreateEntityIdMapError).message;
          code = (exception as any).code;
          break;
      
      case HttpError:
          status = (exception as any).statusCode;
          message = (exception as any).message;
          code = (exception as any).code;
          break;
      default:
          status = HttpStatus.INTERNAL_SERVER_ERROR
    }
    response.status(status).json(GlobalResponseError(status, message, code, request));
  }
}

export const GlobalResponseError: (statusCode: number, message: string, code: string, request: Request) => HttpErrorDto = (
  statusCode: number,
  message: string,
  code: string,
  request: Request
): HttpErrorDto => {
  return {
      statusCode: statusCode,
      message,
      code,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method
  };
};