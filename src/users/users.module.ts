import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { User } from 'src/model/user/user.entity';
// import { userProviders } from 'src/model/user/user.providers';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}