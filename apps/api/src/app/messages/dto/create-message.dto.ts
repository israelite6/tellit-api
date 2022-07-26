import { IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  toUserId: string;

  @IsString()
  message: string;
}

export class FindMessageDto {
  @IsNumber()
  skip: number;

  @IsNumber()
  take: number;

  @IsString()
  toUserId: string;
}
