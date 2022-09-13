import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { response, Response } from 'express';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(
    @Body() body: UserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const tokens = await this.authService.login(body);
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return {
      accessToken: tokens.accessToken,
    };
  }

  @Post('registration')
  async registration(
    @Body() userDto: UserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const res = await this.authService.createUser(userDto);
    response.cookie('refreshToken', res.tokens.refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return {
      user: res.user,
      accessToken: res.tokens.accessToken,
    };
  }

  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const { tokens } = await this.authService.refresh(request.cookies);
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return {
      accessToken: tokens.accessToken,
    };
  }

  @Post('logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const { logout } = await this.authService.logout(request.cookies);
    if (logout) {
      response.clearCookie('refreshToken');
    }
    return {
      logout,
    };
  }
}
