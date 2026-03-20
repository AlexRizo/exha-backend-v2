import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { isUUID } from 'class-validator';
import { TopicService } from '../topic/topic.service';

@Injectable()
export class ExamService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly topicService: TopicService,
  ) {}

  async create(createExamDto: CreateExamDto) {
    const examExists = await this.prisma.exam.findUnique({
      where: {
        code: createExamDto.code,
      },
    });

    if (examExists) {
      throw new ConflictException('El código del examen ya existe');
    }

    const exam = await this.prisma.exam.create({
      data: createExamDto,
    });

    return exam;
  }

  async findAll() {
    const exams = await this.prisma.exam.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: {
            topics: true,
          },
        },
      },
    });

    if (!exams || !exams.length) {
      throw new NotFoundException('No se encontraron examenes');
    }

    return exams;
  }

  async findOne(term: string) {
    const where = isUUID(term) ? { id: term } : { code: term };

    const exam = await this.prisma.exam.findUnique({
      where: {
        ...where,
        isActive: true,
      },
    });

    if (!exam) {
      throw new NotFoundException('No se encontró el examen');
    }

    return exam;
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.exam.update({
      where: { id },
      data: {
        isActive: false,
      },
    });

    return true;
  }
}
