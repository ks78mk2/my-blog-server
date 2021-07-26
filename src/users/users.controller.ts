import { Controller, Delete, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/commons/guards/jwt-auth.guard';
import { Public } from 'src/commons/guards/skip-auth.decorator';
import { CreateDto } from './dto/create-user.dto';
import { UserService } from './users.service';


@Controller('/users')
export class UserController {
  constructor(private readonly userService :UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getFindOne(@Param() id: string) {
    try {
      return this.userService.findOne(id);
    } catch (error : any) {
      console.log(error);
    }    
  }

  // @UseGuards(JwtAuthGuard)
  @Public()
  @Post()
  create(@Body() userData: CreateDto) {
    try {
      return this.userService.create(userData);
    } catch (error : any) {
      console.log(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  delete(@Param() id: string) {
    try {
      return this.userService.delete(id);
    } catch (error : any) {
      console.log(error);
    }
  }
}