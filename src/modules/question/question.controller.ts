import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get(':questionId')
  findOne(@Param('questionId', ParseUUIDPipe) questionId: string) {
    return this.questionService.findOne(questionId);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }
}
