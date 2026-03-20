import { Controller } from '@nestjs/common';
import { TopicService } from './topic.service';

@Controller('exam/:examId/topic')
export class ExamTopicController {
  constructor(private readonly topicService: TopicService) {}
}
