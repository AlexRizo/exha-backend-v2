import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { isUUID } from 'class-validator';
import { Prisma, Role } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { UserRoleDto } from './dto/user-role.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  private readonly logger = new Logger(UserService.name);

  async create({ password, ...createUserDto }: CreateUserDto) {
    try {
      const hashedPassword = hashSync(password, 10);

      const user = await this.prismaService.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
        omit: {
          password: true,
          refreshToken: true,
        },
      });

      return user;
    } catch (error) {
      this.handleDuplicateError(error);
    }
  }

  async findAll({ admin, manager, applicant, student }: UserRoleDto) {
    const rolesToFind: Role[] = [];

    if (admin) rolesToFind.push(Role.admin);
    if (manager) rolesToFind.push(Role.manager);
    if (applicant) rolesToFind.push(Role.applicant);
    if (student) rolesToFind.push(Role.student);

    const users = await this.prismaService.user.findMany({
      where: {
        role: rolesToFind.length ? { in: rolesToFind } : undefined,
        isDeleted: false,
      },
    });

    if (!users || !users.length) {
      throw new NotFoundException('No se encontraron usuarios');
    }

    return users;
  }

  async findOne(term: string) {
    const where = isUUID(term) ? { id: term } : { username: term };

    const user = await this.prismaService.user.findUnique({
      where: { ...where, isDeleted: false },
    });

    if (!user) throw new NotFoundException(`El usuario no existe`);

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) throw new NotFoundException('Usuario desconocido');

    return user;
  }

  async updateRefreshToken(id: string, refreshToken: string | null) {
    await this.findOne(id);

    await this.prismaService.user.update({
      where: { id },
      data: { refreshToken },
    });

    return true;
  }

  async setLastLogin(id: string) {
    await this.findOne(id);

    await this.prismaService.user.update({
      where: { id },
      data: { last_login: new Date() },
    });

    return true;
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if (user.isDeleted) {
      throw new ConflictException('El usuario ya ha sido eliminado');
    }

    await this.prismaService.user.update({
      where: { id },
      data: { isDeleted: true, isActive: false },
    });

    return true;
  }

  private handleDuplicateError(error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      const meta = error.meta;
      const target = (meta?.target as string[]) || [];

      let field = 'campo';

      if (target.includes('email')) field = 'correo electrónico';
      else if (target.includes('username')) field = 'nombre de usuario';
      else if (JSON.stringify(meta).includes('email'))
        field = 'correo electrónico';

      throw new ConflictException(`El ${field} ya existe`);
    }

    this.logger.error(
      'Ha ocurrido un error desconocido',
      JSON.stringify(error),
    );
    throw new InternalServerErrorException('Ha ocurrido un error desconocido');
  }
}
