import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { Request } from 'express';
import { HttpErrorDto } from "./httpError.dto";
export default class CatchException implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
}
export declare const GlobalResponseError: (statusCode: number, message: string, code: string, request: Request) => HttpErrorDto;
