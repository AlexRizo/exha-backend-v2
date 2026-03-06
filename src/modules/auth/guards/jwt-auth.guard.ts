import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '../interfaces/jwt.interface';
import { Request } from 'express';
import { getCookie } from 'src/common/getCookie';

export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = AuthUser>(
    err: any,
    user: TUser,
    info: Error & { message?: string },
    context: ExecutionContext,
  ): TUser {
    const req = context.switchToHttp().getRequest<Request>();

    // 1. Verificamos si la cookie existe en la request
    const hasToken = getCookie(req, 'access_token');

    // 2. Si no hay cookie, lanzamos un mensaje personalizado
    if (!hasToken) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Acceso denegado',
        error: 'Missing Cookie',
      });
    }

    // 3. Si hay cookie pero el token es inválido (err o no user)
    if (err || !user) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Tu sesión ha expirado o el token es inválido.',
        error: 'Invalid Token',
      });
    }

    return user;
  }
}
