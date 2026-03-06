import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compareSync, hashSync } from 'bcrypt';
import type { CookieOptions, Request, Response } from 'express';
import { AuthUser } from './interfaces/jwt.interface';
import { JwtService } from '@nestjs/jwt';
import { envs } from 'src/config/env';
import { getExpTime } from './utils/getExpTime';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(res: Response, req: Request) {
    const user = req.user as AuthUser;

    const { accessToken, refreshToken } = await this.signTokens(user);

    const refreshTokenHash = hashSync(refreshToken, 12);
    await this.userService.updateRefreshToken(user.id, refreshTokenHash);

    res.cookie(
      'refresh_token',
      refreshToken,
      this.cookieOptions(envs.REFRESH_TOKEN_EXPIRES),
    );

    res.cookie(
      'access_token',
      accessToken,
      this.cookieOptions(envs.ACCESS_TOKEN_EXPIRES),
    );

    res.cookie('XSRF-TOKEN', this.generateXsrfToken(), {
      httpOnly: false,
      secure: envs.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: getExpTime('15m'),
      path: '/',
    });

    await this.userService.setLastLogin(user.id);

    return user;
  }

  async refresh(res: Response, userId: string, presentedRefreshToken: string) {
    const user = await this.userService.findOne(userId);

    if (!user || !user.isActive || !user.refreshToken) {
      throw new UnauthorizedException('Acceso denegado');
    }

    const isValidToken = compareSync(presentedRefreshToken, user.refreshToken);

    if (!isValidToken) throw new UnauthorizedException('Acceso denegado');

    const userPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
      username: user.username,
    };

    const { accessToken, refreshToken } = await this.signTokens(userPayload);

    const newRefreshToken = hashSync(refreshToken, 12);

    await this.userService.updateRefreshToken(user.id, newRefreshToken);

    res.cookie(
      'access_token',
      accessToken,
      this.cookieOptions(envs.ACCESS_TOKEN_EXPIRES),
    );

    res.cookie(
      'refresh_token',
      refreshToken,
      this.cookieOptions(envs.REFRESH_TOKEN_EXPIRES),
    );

    res.cookie('XSRF-TOKEN', this.generateXsrfToken(), {
      httpOnly: false,
      secure: envs.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: getExpTime('15m'),
      path: '/',
    });

    return userPayload;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    const validPass = compareSync(password, user.password);

    if (!validPass) {
      return null;
    }

    return user;
  }

  private async signTokens(payload: AuthUser) {
    const expTime = getExpTime(envs.ACCESS_TOKEN_EXPIRES);
    const expTimeRefresh = getExpTime(envs.REFRESH_TOKEN_EXPIRES);

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: envs.ACCESS_TOKEN_SECRET,
      expiresIn: expTime,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: envs.REFRESH_TOKEN_SECRET,
      expiresIn: expTimeRefresh,
    });

    return { accessToken, refreshToken };
  }

  private cookieOptions(value: string): CookieOptions {
    return {
      httpOnly: true,
      secure: envs.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: getExpTime(value),
      path: '/',
    };
  }

  private generateXsrfToken() {
    return randomBytes(32).toString('hex');
  }
}
