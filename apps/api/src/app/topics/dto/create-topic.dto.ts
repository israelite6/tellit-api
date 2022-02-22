import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  forumId: number;

  @IsBoolean()
  showOnFeed: boolean;

  @IsBoolean()
  isVisible: boolean;

  @IsString()
  mention: string;
}
