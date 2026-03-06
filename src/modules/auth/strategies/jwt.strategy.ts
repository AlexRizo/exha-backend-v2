import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { getCookie } from 'src/common/getCookie';
import { envs } from 'src/config/env';
import { UserPayload } from '../interfaces/jwt.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => getCookie(req, 'access_token'),
      ]),
      ignoreExpiration: false,
      secretOrKey: envs.ACCESS_TOKEN_SECRET,
    });
  }

  validate(payload: UserPayload) {
    return {
      id: payload.id,
      email: payload.email,
      username: payload.username,
      role: payload.role,
    };
  }
}
