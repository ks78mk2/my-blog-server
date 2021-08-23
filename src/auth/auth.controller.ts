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
      @Post('/login')
      async login(@Req() req, @Body() userinfo : LoginDto, @Res({ passthrough: true }) res: Response) {
        console.log(req.user)
        const {accessToken, ...accessOption} = await this.authService.getCookieAccessToken(req.user);
        const {refreshToken, ...refreshOption} = await this.authService.getCookieRefreshToken(req.user);
        await this.userService.update_refreshToken(refreshToken, userinfo.id);
    
        res.cookie('Authentication', accessToken, accessOption);
        res.cookie('Refresh', refreshToken, refreshOption);
        return {result : { id : req.user.id, name: req.user.name, auth_level: req.user.auth_level }};
      }
    
      @Public()
      @UseGuards(JwtRefreshGuard)
      @Post('/logout')
      async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
        const {token, ...option} = await this.authService.logout();
        await this.userService.deleteRefreshToken(req.user.id);
    
        res.cookie('Authentication', token, option);
        res.cookie('Refresh', token, option);
        return {result : `logout`};
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
