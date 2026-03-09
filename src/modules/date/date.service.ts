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

  async findAll() {
    const dates = await this.prismaService.date.findMany();

    if (!dates || !dates.length) {
      throw new NotFoundException('No se encontraron aplicaciones');
    }

    return dates;
  }

  async findByDate(startDate: Date, endDate: Date) {
    const start = startDate.setUTCHours(0, 0, 0, 0);
    const end = endDate.setUTCHours(23, 59, 59, 999);

    const dates = await this.prismaService.date.findMany({
      where: {
        scheduleAt: {
          gte: start,
          lte: end,
        },
      },
    });

    if (!dates || !dates.length) {
      throw new NotFoundException('No se encontraron aplicaciones');
    }

    return dates;
  }

  // async findByDateRange(dates: string[]) {
  //   const findDates = await this.prismaService.date.findMany({
  //     where: {
  //       scheduleAt: {
  //         gte: dates[0],
  //         lte: dates[1],
  //       },
  //     },
  //     orderBy: {
  //       scheduleAt: 'asc',
  //     },
  //   });

  //   if (!findDates || !findDates.length) {
  //     throw new NotFoundException('No se encontraron aplicaciones');
  //   }

  //   return findDates;
  // }
}
