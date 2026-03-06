import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { getCookie } from 'src/common/getCookie';
import { envs } from 'src/config/env';
import { UserPayload } from '../interfaces/jwt.interface';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => getCookie(req, 'refresh_token'),
      ]),
      ignoreExpiration: false,
      secretOrKey: envs.REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: UserPayload) {
    const token = getCookie(req, 'refresh_token');

    return {
      id: payload.id,
      email: payload.email,
      username: payload.username,
      role: payload.role,
      refreshToken: token,
    };
  }
}
