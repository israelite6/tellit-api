import { EOs } from '@prisma/client';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateFcmDto {
  @IsString()
  @IsNotEmpty()
  deviceToken: string;

  @IsEnum(EOs)
  @IsNotEmpty()
  os: EOs;
}
