import { Length, IsOptional, IsString } from "class-validator";

export class CreateDto {
    @IsString()
    @Length(4, 10)
    readonly id: string;

    @IsString()
    @Length(8, 20)
    readonly password: string;

    @IsString()
    @Length(2, 10)
    readonly name: string;

    @IsOptional()
    readonly auth_level: number;
}
