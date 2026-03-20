import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTopicDto {
  @IsString()
  @IsOptional()
  @Transform(({ value }: { value: string }) =>
    value.trim() === '' ? undefined : value.trim(),
  )
  title?: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }: { value: string }) =>
    value.trim() === '' ? undefined : Number(value),
  )
  order?: number;
}
