import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { PrismaService } from '../prisma/prisma.service';
import { TopicModule } from '../topic/topic.module';

@Module({
  controllers: [ExamController],
  providers: [ExamService, PrismaService],
  imports: [TopicModule],
})
export class ExamModule {}
