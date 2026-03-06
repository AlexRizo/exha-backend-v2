import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { isUUID } from 'class-validator';
import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';

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

  async findAll() {
    const users = await this.prismaService.user.findMany();

    if (!users || !users.length) {
      throw new NotFoundException('No se encontraron usuarios');
    }

    return users;
  }

  async findOne(term: string) {
    const where = isUUID(term) ? { id: term } : { username: term };

    const user = await this.prismaService.user.findUnique({ where });

    if (!user) throw new NotFoundException(`El usuario no existe`);

    return user;
  }

  async updateRefreshToken(id: string, refreshToken: string) {
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

  private handleDuplicateError(error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      const target = (error.meta?.target ?? []) as string[];

      const field =
        target[0] === 'email' ? 'correo electrónico' : 'nombre de usuario';

      throw new ConflictException(`El ${field} ya existe`);
    }

    this.logger.error(
      'Ha ocurrido un error desconocido',
      JSON.stringify(error),
    );
    throw new InternalServerErrorException('Ha ocurrido un error desconocido');
  }
}
