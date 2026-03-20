import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { isUUID } from 'class-validator';
import { CreateTopicDto } from './dto/create-topic.dto';
import { ExamService } from '../exam/exam.service';

@Injectable()
export class TopicService {
  constructor(
    private readonly prismaService: PrismaService,

    @Inject(forwardRef(() => ExamService))
    private readonly examService: ExamService,
  ) {}

  async findAll() {
    const topics = await this.prismaService.topic.findMany();

    if (!topics || !topics.length) {
      throw new NotFoundException('No se encontraron tópicos');
    }

    return topics;
  }

  async findOne(term: string) {
    const where = isUUID(term) ? { id: term } : { code: term };

    const topic = await this.prismaService.topic.findUnique({ where });

    if (!topic) {
      throw new NotFoundException('No se encontró el tópico');
    }

    return topic;
  }

  async findManyByExam(examId: string) {
    const topics = await this.prismaService.topic.findMany({
      where: { examId },
      include: {
        _count: {
          select: {
            questions: true,
          },
        },
      },
    });

    if (!topics || !topics.length) {
      throw new NotFoundException('No se encontraron tópicos');
    }

    return topics;
  }

  async create(examId: string, topicDto: CreateTopicDto) {
    const exam = await this.examService.findOne(examId);

    const topicCode = `${exam.code}-${topicDto.code}`;

    const topicExist = await this.prismaService.topic.findUnique({
      where: { code: topicCode },
    });

    if (topicExist) throw new ConflictException('El tópico ya existe');

    const topic = await this.prismaService.topic.create({
      data: {
        ...topicDto,
        code: topicCode,
        examId: examId,
      },
      include: {
        _count: {
          select: {
            questions: true,
          },
        },
      },
    });

    return topic;
  }
}
