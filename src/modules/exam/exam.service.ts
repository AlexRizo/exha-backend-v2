import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { nanoid } from 'nanoid';
import { isUUID } from 'class-validator';
import { TopicService } from '../topic/topic.service';

@Injectable()
export class ExamService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly topicService: TopicService,
  ) {}

  async create(createExamDto: CreateExamDto) {
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

  async findAll() {
    const exams = await this.prisma.exam.findMany({
      where: { isActive: true },
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

  async findExamTopics(examId: string) {
    await this.findOne(examId);

    return this.topicService.findManyByExam(examId);
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
