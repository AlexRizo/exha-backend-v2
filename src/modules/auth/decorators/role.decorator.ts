import { SetMetadata } from '@nestjs/common';
import { Role as UserRole } from '@prisma/client';

export const META_ROLES = 'roles';

export const Role = (...args: UserRole[]) => {
  return SetMetadata(META_ROLES, args);
};
