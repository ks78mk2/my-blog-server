import { Controller, Get, UseGuards, Post, Body, Res, Req } from '@nestjs/common';
import { LocalAuthGuard } from 'src/commons/guards/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { Response } from 'express';
import { Public } from 'src/commons/guards/skip-auth.decorator';
import { LoginDto } from 'src/auth/dto/login.dto';
import { UserService } from 'src/users/users.service';
import { JwtRefreshGuard } from 'src/commons/guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private readonly userService: UserService,
      ) {}
    
      @Public()
      @UseGuards(LocalAuthGuard)
      @Post('/signin')
      async signIn(@Req() req, @Body() userinfo : LoginDto, @Res({ passthrough: true }) res: Response) {
        console.log(req.user)
        const {accessToken, ...accessOption} = await this.authService.getCookieAccessToken(userinfo);
        const {refreshToken, ...refreshOption} = await this.authService.getCookieRefreshToken(userinfo);
        await this.userService.update_refreshToken(refreshToken, userinfo.id);
    
        res.cookie('Authentication', accessToken, accessOption);
        res.cookie('Refresh', refreshToken, refreshOption);
        return {result : { id : userinfo.id, }};
      }
    
      @Public()
      @UseGuards(JwtRefreshGuard)
      @Post('/signout')
      async logOut(@Req() req, @Res({ passthrough: true }) res: Response) {
        const {token, ...option} = await this.authService.signOut();
        await this.userService.deleteRefreshToken(req.user.id);
    
        res.cookie('Authentication', token, option);
        res.cookie('Refresh', token, option);
        return {result : `signOut`};
      }
    
      @Public()
      @UseGuards(JwtRefreshGuard)
      @Get('/refresh')
      async refresh(@Req() req, @Res({ passthrough: true }) res: Response) {
        const user = req.user;
        const { accessToken, ...accessOption} = await this.authService.getCookieAccessToken(user.id);
        res.cookie('Authentication', accessToken, accessOption);
        return {result : `refresh`};
      }
}
