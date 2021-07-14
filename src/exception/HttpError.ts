import { HttpException, Injectable } from "@nestjs/common";

@Injectable()
export default class HttpError extends HttpException {
  public statusCode: number = 0;
  public message: string = '';

  constructor(status: number, message: string) {
    super(message, status);
    this.statusCode = status;
    this.message = message;
  }
}