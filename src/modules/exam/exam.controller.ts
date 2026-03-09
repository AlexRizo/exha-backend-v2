import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ExamService } from './exam.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CreateExamDto } from './dto/create-exam.dto';
import { AllowedRole } from '../auth/decorators/allowed-role.decorator';
import { Role } from '@prisma/client';

@Auth()
@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.examService.findOne(term);
  }

  @Get()
  findAll() {
    return this.examService.findAll();
  }

  @Get(':examId/topics')
  findExamTopics(@Param('examId', ParseUUIDPipe) examId: string) {
    return this.examService.findExamTopics(examId);
  }

  @AllowedRole(Role.admin)
  @Post()
  createExam(@Body() createExamDto: CreateExamDto) {
    return this.examService.createExam(createExamDto);
  }
}
