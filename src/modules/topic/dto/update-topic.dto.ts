import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { TransformVoidNumber, TransformVoidString } from 'src/common/decorators/is-void-string.decorator';

export class UpdateTopicDto {
  @IsString()
  @IsOptional()
  @TransformVoidString()
  title?: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }: { value: string | undefined }) =>
    value === undefined || value.trim() === '' ? undefined : Number(value),
  )
  order?: number;
}
