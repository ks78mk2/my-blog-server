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
  @Post('/signin')
  async signIn(@Body() userinfo : LoginDto) {
    try {
      return this.authService.signIn(userinfo);
    } catch (error) {
      console.log(error);
    }
  }

  @Public()
  @Get('/')
  async hello() {
    return 'hello!!!!z'
  }

}
