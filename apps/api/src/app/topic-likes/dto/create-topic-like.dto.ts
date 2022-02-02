import { IsEnum, IsNotEmpty } from 'class-validator';
import { ELikeType } from '@prisma/client';

export class CreateTopicLikeDto {
  @IsNotEmpty()
  @IsEnum(ELikeType)
  type: ELikeType;
}
