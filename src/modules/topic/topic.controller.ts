import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { TopicService } from './topic.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { UpdateTopicDto } from './dto/update-topic.dto';

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

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTopicDto: UpdateTopicDto,
  ) {
    return this.topicService.update(id, updateTopicDto);
  }

  @Patch(':id/delete')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.topicService.remove(id);
  }
}
