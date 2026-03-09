import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DateService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: string) {
    const date = await this.prismaService.date.findUnique({
      where: {
        id,
      },
    });

    if (!date) throw new NotFoundException('No se encontró la aplicación');

    return date;
  }
}
