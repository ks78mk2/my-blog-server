import { HttpException } from "@nestjs/common";
import { IsNumber,  IsString } from "class-validator";

export class HttpErrorDto extends HttpException{
    @IsString()
    readonly code: string[];
}