import { IsNotEmpty, IsString } from 'class-validator';
export class CreateForumDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsString()
  bannarUrl: string;

  @IsString()
  iconUrl: string;
}
