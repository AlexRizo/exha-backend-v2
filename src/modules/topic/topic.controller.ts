import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { TopicService } from './topic.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CreateTopicDto } from './dto/create-topic.dto';

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

  @Post()
  create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicService.create(createTopicDto);
  }
}
