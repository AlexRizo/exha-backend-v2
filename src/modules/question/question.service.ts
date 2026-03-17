import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { FileFieldsPayload } from './pipes/parse-file-fields.pipe';

@Injectable()
export class QuestionService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: string) {
    const question = await this.prismaService.question.findUnique({
      where: { id },
    });

    if (!question) throw new NotFoundException('No se encontró la pregunta');

    return question;
  }

  async findAll() {
    const questions = await this.prismaService.question.findMany();

    if (!questions || !questions.length) {
      throw new NotFoundException('No se encontraron preguntas');
    }

    return questions;
  }

  async create(
    { options, ...questionDto }: CreateQuestionDto,
    files: FileFieldsPayload,
  ) {
    const { questionFile, optionFile } = files;

    const question = await this.prismaService.question.create({
      data: {
        ...questionDto,
        code: 'test',
      },
    });

    const createdOptions = await this.prismaService.option.createMany({
      data: options.map((option) => ({
        ...option,
        questionId: question.id,
      })),
    });

    console.log({ questionFile, optionFile });

    return { question, createdOptions };
  }
}
