import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { LocalAuthGuard } from './commons/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from 'src/commons/guards/skip-auth.decorator';
import { LoginDto } from './auth/dto/login.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() userinfo : LoginDto) {
    return this.authService.login(userinfo);
  }

  @Public()
  @Get('/')
  async hello() {
    return 'hello!!'
  }

}
