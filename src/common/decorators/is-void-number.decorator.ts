import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export const TransformVoidNumber = () =>
  applyDecorators(
    IsNumber(),
    IsOptional(),
    Transform(({ value }: { value: string | undefined }) => {
      const trimmed = typeof value === 'string' ? value.trim() : value;
      return trimmed === '' ? undefined : Number(trimmed);
    }),
  );
