import { forwardRef, Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ExamModule } from '../exam/exam.module';
import { ExamTopicController } from './exam-topic.controller';

@Module({
  controllers: [TopicController, ExamTopicController],
  providers: [TopicService],
  imports: [PrismaModule, forwardRef(() => ExamModule)],
  exports: [TopicService],
})
export class TopicModule {}
