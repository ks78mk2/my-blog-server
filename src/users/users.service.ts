import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/model/user/user.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(id : string): Promise<User> {
    return await this.userRepository.findOne({id});
  }

  async create(userData : CreateDto): Promise<{id:string, auth_level:number}> {
    const user = new User();
    user.id = userData.id;
    const salt: string = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(userData.password, salt);
    user.auth_level = userData.auth_level;

    const { password, refresh_token ,...result} = await this.userRepository.save(user);
    return result;
  }

  async delete(id : string): Promise<any> {
    return await this.userRepository.delete({id});
  }
}