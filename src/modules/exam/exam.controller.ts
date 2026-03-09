import { Body, Controller, Post } from '@nestjs/common';
import { ExamService } from './exam.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CreateExamDto } from './dto/create-exam.dto';
import { AllowedRole } from '../auth/decorators/allowed-role.decorator';
import { Role } from '@prisma/client';

@Auth()
@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @AllowedRole(Role.admin)
  @Post()
  createExam(@Body() createExamDto: CreateExamDto) {
    return this.examService.createExam(createExamDto);
  }
}
