import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export const TransformVoidString = () =>
  applyDecorators(
    IsString(),
    IsOptional(),
    Transform(({ value }: { value: string | undefined }) => {
      const trimmed = typeof value === 'string' ? value.trim() : value;
      return trimmed === '' ? undefined : trimmed;
    }),
  );
