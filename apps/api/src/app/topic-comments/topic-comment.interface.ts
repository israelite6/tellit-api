import { ECommentType } from '@prisma/client';
export interface ICreateTopicCommentProps {
  userId: string;
  isAnonymous?: boolean;
  comment: string;
  topicCommentId?: string;
  topicId?: number;
  type: ECommentType;
  answerId?: number;
}

export interface IFindManyTopicCommentProps {
  topicId?: number;
  answerId?: number;
  page: number;
  topicCommentId?: string;
  userId?: string;
  type: ECommentType;
}
