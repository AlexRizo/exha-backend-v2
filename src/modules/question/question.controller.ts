import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { sanitizeFileName, setDestination } from './helpers/questionFiles';

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
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'questionFile', maxCount: 1 },
        { name: 'optionFile', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: setDestination,
          filename: sanitizeFileName,
        }),
      },
    ),
  )
  create(
    @Body() createQuestionDto: CreateQuestionDto,
    @UploadedFiles()
    files: {
      questionFile: Express.Multer.File;
      optionFile: Express.Multer.File;
    },
  ) {
    return this.questionService.create(createQuestionDto, files);
  }
}
