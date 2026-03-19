import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateExamDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z]{4}-\d{6}$/, {
    message: 'El código solo puede contener letras, números y guiones',
  })
  code: string;
}
