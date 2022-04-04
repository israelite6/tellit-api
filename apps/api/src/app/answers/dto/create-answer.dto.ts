import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  @IsNotEmpty()
  answer: string;

  @IsNumber()
  @IsNotEmpty()
  questionId: number;
}
