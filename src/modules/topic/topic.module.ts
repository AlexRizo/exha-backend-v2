import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [TopicController],
  providers: [TopicService],
  imports: [PrismaModule],
  exports: [TopicService],
})
export class TopicModule {}
