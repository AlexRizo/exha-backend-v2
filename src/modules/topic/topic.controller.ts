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
import { AllowedRole } from '../auth/decorators/allowed-role.decorator';
import { Role } from '@prisma/client';

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

  // ? Cuando inicias el segmento de la url con '/';
  // ? partes a partir de la raiz, y no de @Controller('segmento/...')
  @AllowedRole(Role.admin)
  @Post('/exam/:examId/topic')
  create(
    @Param('examId', ParseUUIDPipe) examId: string,
    @Body() createTopicDto: CreateTopicDto,
  ) {
    return this.topicService.create(examId, createTopicDto);
  }
}
