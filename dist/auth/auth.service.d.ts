import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private usersService;
    private jwtService;
    private readonly configService;
    constructor(usersService: UserService, jwtService: JwtService, configService: ConfigService);
    validateUser(id: string, password: string): Promise<any>;
    getCookieAccessToken(user: any): Promise<{
        accessToken: string;
        domain: any;
        path: string;
        httpOnly: boolean;
        maxAge: number;
    }>;
    getCookieRefreshToken(user: any): Promise<{
        refreshToken: string;
        domain: any;
        path: string;
        httpOnly: boolean;
        maxAge: number;
    }>;
    logout(): Promise<{
        token: string;
        domain: any;
        path: string;
        httpOnly: boolean;
        maxAge: number;
    }>;
}
