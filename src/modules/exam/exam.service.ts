import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class ExamService {
  constructor(private readonly prisma: PrismaService) {}

  async createExam(createExamDto: CreateExamDto) {
    const code = nanoid(6);
    const examCode = `EXHA-${code}`;

    const examExists = await this.prisma.exam.findUnique({
      where: {
        code: examCode,
      },
    });

    if (examExists) {
      throw new ConflictException('El examen ya existe');
    }

    const exam = await this.prisma.exam.create({
      data: {
        ...createExamDto,
        code: examCode,
      },
    });

    return exam;
  }
}
