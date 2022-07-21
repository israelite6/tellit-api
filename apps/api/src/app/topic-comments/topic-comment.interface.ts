import { ECommentType } from '@prisma/client';
export interface ICreateTopicCommentProps {
  userId: string;
  isAnonymous?: boolean;
  comment: string;
  topicCommentId?: string;
  topicId?: number;
  type: ECommentType;
  answerId?: string;
}

export interface IFindManyTopicCommentProps {
  topicId?: number;
  answerId?: string;
  page: number;
  topicCommentId?: string;
  userId?: string;
  type: ECommentType;
}
