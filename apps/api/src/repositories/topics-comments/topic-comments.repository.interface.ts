import { Prisma, TopicComment, ECommentType } from '@prisma/client';
export interface IUpdateTopicCommentProps {
  id: string;
  data: Partial<Prisma.TopicCommentUncheckedCreateInput>;
}

export interface IFindManyTopicCommentProps {
  skip: number;
  take: number;
  topicId?: number;
  topicCommentId?: string;
  userId?: string;
  answerId?: number;
  type: ECommentType;
}

export interface IFindManyTopicComment {
  topicComments: Partial<TopicComment>[];
  total: number;
}
