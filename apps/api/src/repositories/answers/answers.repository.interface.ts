import { Prisma, Answer } from '@prisma/client';
export interface IUpdateAnswerProps {
  id: number;
  data: Partial<Prisma.AnswerCreateInput>;
}

export interface IFindManyAnswerProps {
  skip: number;
  take: number;
  questionId?: number;
  userId?: string;
}

export interface IFindManyAnswer {
  answers: Partial<Answer>[];
  total: number;
}
