import { Role } from '@prisma/client';

export interface UserPayload {
  id: string;
  email: string;
  username: string;
  role: Role;
  refreshToken: string;
  iat?: string;
  exp?: string;
}
