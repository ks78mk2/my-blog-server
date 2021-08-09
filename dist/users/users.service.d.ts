import { Repository } from 'typeorm';
import { User } from 'src/model/user/user.entity';
import { CreateDto } from './dto/create-user.dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findOne(id: string): Promise<User | any>;
    create(userData: CreateDto): Promise<{
        id: string;
        auth_level: number;
    } | any>;
    delete(id: string): Promise<any>;
    update_refreshToken(refreshToken: string, id: string): Promise<any>;
    getUserIfRefreshTokenMatches(refreshToken: string, id: string): Promise<any>;
    deleteRefreshToken(id: number): Promise<any>;
}
