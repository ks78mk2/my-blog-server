import { IsNumber,  IsString } from "class-validator";

export class HttpErrorDto{
    @IsNumber()    
    readonly statusCode: number;

    @IsString()
    readonly message: string;

    @IsString()
    readonly code: string;

    @IsString()
    readonly timestamp: string;

    @IsString()
    readonly path: string;

    @IsString()
    readonly method: string;
}