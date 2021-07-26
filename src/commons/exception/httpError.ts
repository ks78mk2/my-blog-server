import { HttpException, Injectable } from "@nestjs/common";

@Injectable()
export default class HttpError extends HttpException {
  public statusCode: number = 0;
  public message: string = '';
  public code: string = '0000';

  constructor(status: number, message: string, code : string | undefined) {
    super('Forbidden', status);
    this.statusCode = status;
    this.message = message;
    this.code = code? code : '0000';
  }
}