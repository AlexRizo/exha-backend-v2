import { forwardRef, Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { TopicModule } from '../topic/topic.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ExamController],
  providers: [ExamService],
  imports: [PrismaModule, forwardRef(() => TopicModule)],
  exports: [ExamService],
})
export class ExamModule {}
