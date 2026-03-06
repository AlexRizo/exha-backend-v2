import { UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '../interfaces/jwt.interface';

export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = AuthUser>(
    err: any,
    user: TUser,
    info: Error & { message?: string },
  ): TUser {
    if (err) throw err;

    if (!user) {
      const message = info?.message ?? 'El token no es válido o ya expiró';

      throw new UnauthorizedException({ message });
    }

    return user;
  }
}
