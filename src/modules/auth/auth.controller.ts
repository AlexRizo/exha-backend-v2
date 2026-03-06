import { Controller, Post, UseGuards, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import { GetUser } from './decorators/get-user.decorator';
import type { UserPayload } from './interfaces/jwt.interface';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    return this.authService.login(res, req);
  }

  @Auth()
  @Post('logout')
  logout(
    @Res({ passthrough: true }) res: Response,
    @GetUser('id') userId: string,
  ) {
    return this.authService.logout(res, userId);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  refresh(
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: UserPayload,
  ) {
    return this.authService.refresh(res, user.id, user.refreshToken);
  }
}
