import { Letter, QuestionType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionOption)
  options: QuestionOption[];

  @IsUUID()
  topicId: string;

  @IsUUID()
  @IsOptional()
  groupId?: string;
}

class QuestionOption {
  @IsEnum(Letter)
  letter: Letter;

  @IsString()
  @IsOptional()
  content?: string;

  @IsBoolean()
  isCorrect: boolean;
}
