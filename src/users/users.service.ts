import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/model/user/user.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import HttpError from 'src/commons/exception/httpError';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(id : string): Promise<User | any> {
    const result = await this.userRepository.findOne({id});
    return result
  }

  async create(userData : CreateDto): Promise<{id:string, auth_level:number} | any> {
    try {
      const user = new User();
      user.id = userData.id;
      const salt: string = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(userData.password, salt);
      user.auth_level = userData.auth_level;

      // const { password, refresh_token ,...result} = await this.userRepository.create(user);
      const result = await this.userRepository.insert(user);
      return result;
    } catch (error) {
      if (error?.code === "ER_DUP_ENTRY") {
        throw new HttpError(400, "아이디가 중복되었습니다.", "0001")
      }
    }    
  }

  async delete(id : string): Promise<any> {
    return await this.userRepository.delete({id});
  }

  async update_refreshToken(refreshToken: string, id: string): Promise<any>{
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.update(id, { refresh_token : hashedRefreshToken });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, id: string) : Promise<any>{
    const user = await this.findOne(id);
    const isRefreshTokenMatching = await bcrypt.compare(refreshToken, user.refresh_token);

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async deleteRefreshToken(id: number) : Promise<any>{
    return this.userRepository.update(id, { refresh_token: null });
  }
}