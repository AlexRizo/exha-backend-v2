import { Prisma } from '@prisma/client';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

export const handleDuplicateError = (error: unknown) => {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2002'
  ) {
    const target = (error.meta?.target ?? []) as string[];

    const field =
      target[0] === 'email' ? 'correo electrónico' : 'nombre de usuario';

    throw new ConflictException(`El ${field} ya existe`);
  }

  throw new InternalServerErrorException('Ha ocurrido un error desconocido');
};
