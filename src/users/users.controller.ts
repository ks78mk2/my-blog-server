import { Controller, Delete, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/commons/guards/jwt-auth.guard';
import { Public } from 'src/commons/guards/skip-auth.decorator';
import { CreateDto } from './dto/create-user.dto';
import { UserService } from './users.service';


@Controller('/users')
export class UserController {
  constructor(private readonly userService :UserService) {}

  @Get('/:id')
  async getFindOne(@Param('id') id: string) {
    const result = await this.userService.findOne(id);        
    return {result}
  }

  // @UseGuards(JwtAuthGuard)
  @Public()
  @Post()
  async create(@Body() userData: CreateDto) {
    const result = await this.userService.create(userData);
    return {result}
  }

  @Delete('/:id')
  async delete(@Param() id: string) {
    const result = await this.userService.delete(id);
    return {result}
  }
}