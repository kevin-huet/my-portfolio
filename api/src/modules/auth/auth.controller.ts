import {Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import {UserDto} from "./dto/user.dto";
import {Request, Response} from "express";
import {JwtAuthGuard} from "./guards/auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: UserDto, @Res() res: Response) {
    const tokens = await this.authService.verifyUser(body);

    res.cookie('refreshToken', tokens.refreshToken, {
      sameSite: 'strict',
      httpOnly: true,
      secure: true,
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
    });
    return res.json({ access_token: tokens.accessToken });
  }

  @Post('refresh')
  async refresh(@Req() req, @Res() res: Response) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: 'Unauthorized' });

    try {
      const tokens = await this.authService.refreshToken(refreshToken);
      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/auth/refresh',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({ access_token: tokens.accessToken });
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('refreshToken', { path: '/auth/refresh' });
    return res.json({ message: 'Logged out' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Req() req: Request) {
    if (!req.user) throw new UnauthorizedException();
    return req.user;
  }
}
