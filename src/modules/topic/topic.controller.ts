import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { TopicService } from './topic.service';
import { Auth } from '../auth/decorators/auth.decorator';

@Auth()
@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  findAll() {
    return this.topicService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.topicService.findOne(term);
  }

  @Get('exam/:examId')
  findManyByExam(@Param('examId', ParseUUIDPipe) examId: string) {
    return this.topicService.findManyByExam(examId);
  }
}
