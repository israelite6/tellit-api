import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateTopicCommentDto {
  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsBoolean()
  isAnonymous: boolean;

  @IsString()
  topicCommentId: string;
}
