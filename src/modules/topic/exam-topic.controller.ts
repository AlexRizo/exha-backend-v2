import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { TopicService } from './topic.service';
import { AllowedRole } from '../auth/decorators/allowed-role.decorator';
import { Role } from '@prisma/client';
import { CreateTopicDto } from './dto/create-topic.dto';

@Controller('exam/:examId/topic')
export class ExamTopicController {
  constructor(private readonly topicService: TopicService) {}

  @AllowedRole(Role.admin)
  @Post()
  create(
    @Param('examId', ParseUUIDPipe) examId: string,
    @Body() createTopicDto: CreateTopicDto,
  ) {
    return this.topicService.create(examId, createTopicDto);
  }
}
