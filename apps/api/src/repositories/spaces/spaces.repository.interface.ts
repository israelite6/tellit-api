import { Prisma } from '@prisma/client';
export interface IUpdateProps {
  id: number;
  data: Partial<Prisma.SpaceCreateInput>;
}
