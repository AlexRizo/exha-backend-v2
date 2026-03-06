import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { timingSafeEqual } from 'crypto';
import type { Request } from 'express';
import { getCookie } from 'src/common/getCookie';

@Injectable()
export class CsrfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest();
    const method = req.method.toUpperCase();

    const protectedMethods = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

    if (!protectedMethods.has(method)) return true;

    const cookieToken = getCookie(req, 'XSRF-TOKEN');
    const headerToken = (req.headers['x-xsrf-token'] ??
      req.headers['x-csrf-token']) as string;

    if (!cookieToken || !headerToken) return false;

    try {
      const cookieTokenBuffer = Buffer.from(cookieToken);
      const headerTokenBuffer = Buffer.from(headerToken);

      return (
        cookieTokenBuffer.length === headerTokenBuffer.length &&
        timingSafeEqual(cookieTokenBuffer, headerTokenBuffer)
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
