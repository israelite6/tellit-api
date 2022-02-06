import { ELikeType, ELikeCategory } from '@prisma/client';
export interface ICheckExitProps {
  userId: string;
  topicId: number | bigint;
  type: ELikeType;
  category: ELikeCategory;
  topicCommentId: string;
}
