import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@Controller('/users')
export class UserController {

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}