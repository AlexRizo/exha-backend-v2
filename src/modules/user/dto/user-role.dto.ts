import { Type } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class UserRoleDto {
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  admin: boolean;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  manager: boolean;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  applicant: boolean;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  student: boolean;
}
