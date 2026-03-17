import { Role } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @Transform(({ value }) =>
    value === '' ? undefined : (value as string).trim(),
  )
  first_name?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) =>
    value === '' ? undefined : (value as string).trim(),
  )
  last_name?: string;

  @IsEmail()
  @IsOptional()
  @Transform(({ value }) =>
    value === '' ? undefined : (value as string).trim(),
  )
  email?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) =>
    value === '' ? undefined : (value as string).trim(),
  )
  @Matches(/^[a-zA-Z0-9_]*$/, {
    message:
      'El nombre de usuario solo puede contener letras, números y guiones bajos',
  })
  username?: string;

  @IsEnum(Role)
  @IsOptional()
  @Transform(({ value }) =>
    value === '' ? undefined : (value as string).trim(),
  )
  role?: Role;

  @IsString()
  @IsOptional()
  @Transform(({ value }) =>
    value === '' ? undefined : (value as string).trim(),
  )
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,}$/, {
    message:
      'La contraseña debe tener al menos 6 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial',
  })
  password?: string;
}
