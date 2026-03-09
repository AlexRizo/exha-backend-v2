import { IsInt, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsInt()
  order: number;

  @IsUUID()
  examId: string;
}
