import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { TopicService } from './topic.service';
import { Role } from '@prisma/client';
import { CreateTopicDto } from './dto/create-topic.dto';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('exam/:examId/topic')
export class ExamTopicController {
  constructor(private readonly topicService: TopicService) {}

  @Auth(Role.admin)
  @Post()
  create(
    @Param('examId', ParseUUIDPipe) examId: string,
    @Body() createTopicDto: CreateTopicDto,
  ) {
    return this.topicService.create(examId, createTopicDto);
  }

  @Auth()
  @Get()
  findTopicsByExam(@Param('examId', ParseUUIDPipe) examId: string) {
    return this.topicService.findTopicsByExam(examId);
  }
}
