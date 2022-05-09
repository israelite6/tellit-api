import { CreateAnswerDto } from './dto/create-answer.dto';

export interface ICreateAnswerProps extends CreateAnswerDto {
  userId: string;
}

export interface IFindAllAnswerProps {
  page: number;
  questionId?: number;
}
