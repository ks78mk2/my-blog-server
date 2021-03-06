import { AuthService } from 'src/auth/auth.service';
import { Response } from 'express';
import { LoginDto } from 'src/auth/dto/login.dto';
import { UserService } from 'src/users/users.service';
export declare class AuthController {
    private authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    login(req: any, userinfo: LoginDto, res: Response): Promise<{
        result: {
            id: any;
            name: any;
            auth_level: any;
        };
    }>;
    guestLogin(res: Response): Promise<{
        result: {
            id: string;
            name: string;
            auth_level: number;
        };
    }>;
    logout(req: any, res: Response): Promise<{
        result: string;
    }>;
    guestLogout(res: Response): Promise<{
        result: string;
    }>;
    refresh(req: any, res: Response): Promise<{
        result: string;
    }>;
}
