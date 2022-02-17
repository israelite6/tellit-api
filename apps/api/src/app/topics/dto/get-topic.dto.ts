import { IsNumberString } from 'class-validator';
export class GetTopicDto {
  @IsNumberString()
  page: number;

  @IsNumberString()
  forumId: string;
}
