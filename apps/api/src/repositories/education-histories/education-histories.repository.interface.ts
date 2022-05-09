import { Prisma, EducationHistory } from '@prisma/client';
export interface IUpdateEducationHistoryProps {
  id: string;
  data: Partial<Prisma.EducationHistoryUncheckedCreateInput>;
}

export interface IFindManyEducationHistoryProps {
  userId: string;
}

export interface IFindManyEducationHistory {
  educationHistorys: Partial<EducationHistory>[];
  total: number;
}
