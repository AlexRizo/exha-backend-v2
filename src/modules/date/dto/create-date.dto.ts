import { IsDateString, IsUUID } from 'class-validator';

export class CreateDateDto {
  @IsUUID()
  examId: string;

  @IsDateString()
  scheduleAt: string;
}
