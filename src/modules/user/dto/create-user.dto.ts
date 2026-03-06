import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9_]*$/, {
    message:
      'El nombre de usuario solo puede contener letras, números y guiones bajos',
  })
  @IsNotEmpty()
  username: string;

  @IsEnum(Role)
  role: Role;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,}$/, {
    message:
      'La contraseña debe tener al menos 6 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial',
  })
  password: string;
}
