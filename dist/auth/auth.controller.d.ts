import { AuthService } from 'src/auth/auth.service';
import { Response } from 'express';
import { LoginDto } from 'src/auth/dto/login.dto';
import { UserService } from 'src/users/users.service';
export declare class AuthController {
    private authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    signIn(req: any, userinfo: LoginDto, res: Response): Promise<{
        result: {
            id: string;
        };
    }>;
    logOut(req: any, res: Response): Promise<{
        result: string;
    }>;
    refresh(req: any, res: Response): Promise<{
        result: string;
    }>;
}
