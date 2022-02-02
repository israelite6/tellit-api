import { ELikes } from './../../../config/constants';
import { IsEnum, IsIn, IsNotEmpty } from 'class-validator';

export class CreateTopicLikeDto {
  @IsNotEmpty()
  @IsEnum(ELikes)
  type: ELikes;
}
