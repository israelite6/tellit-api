import { Prisma, Question } from '@prisma/client';
export interface IUpdateQuestionProps {
  id: number;
  data: Partial<Prisma.QuestionCreateInput>;
}

export interface IFindManyQuestionProps {
  skip: number;
  take: number;
  spaceId?: number;
  userId?: string;
}

export interface IFindManyQuestion {
  questions: Partial<Question>[];
  total: number;
}
