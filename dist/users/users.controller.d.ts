import { CreateDto } from './dto/create-user.dto';
import { UserService } from './users.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getFindOne(id: string): Promise<{
        result: any;
    }>;
    create(userData: CreateDto): Promise<{
        result: any;
    }>;
    delete(id: string): Promise<{
        result: any;
    }>;
}
