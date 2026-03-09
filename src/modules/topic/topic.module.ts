import { forwardRef, Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ExamModule } from '../exam/exam.module';

@Module({
  controllers: [TopicController],
  providers: [TopicService],
  imports: [PrismaModule, forwardRef(() => ExamModule)],
  exports: [TopicService],
})
export class TopicModule {}
