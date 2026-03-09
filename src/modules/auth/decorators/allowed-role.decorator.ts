import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role as UserRole } from '@prisma/client';
import { Role } from './role.decorator';
import { UserRoleGuard } from '../guards/user-role.guard';

export const AllowedRole = (...roles: UserRole[]) => {
  return applyDecorators(Role(...roles), UseGuards(UserRoleGuard));
};
