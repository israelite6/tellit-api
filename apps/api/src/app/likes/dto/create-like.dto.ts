import { IsEnum, IsNotEmpty } from 'class-validator';
import { ELikeCategory, ELikeType } from '@prisma/client';

export class CreateLikeDto {
  @IsNotEmpty()
  @IsEnum(ELikeType)
  type: ELikeType;

  @IsEnum(ELikeCategory)
  category: ELikeCategory;
}
