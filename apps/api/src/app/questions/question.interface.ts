import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

export interface ICreateQuestionProp extends CreateQuestionDto {
  userId: string;
}

export interface IGetQuestionsQuery {
  page: string;
  spaceId?: string;
}

export interface IGetQuestionsProps {
  page: number;
  spaceId?: number;
}

export interface IGetRelatedQuestionsQuery {
  spaceId: string;
}

export interface IGetRelatedQuestionsProps {
  spaceId: number;
}

export interface IUpdateQuestionProps {
  id: number;
  data: UpdateQuestionDto;
}
