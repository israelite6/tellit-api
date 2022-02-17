import { Prisma, TopicComment } from '@prisma/client';
export interface IUpdateTopicCommentProps {
  id: string;
  data: Partial<Prisma.TopicCommentUncheckedCreateInput>;
}

export interface IFindManyTopicCommentProps {
  skip: number;
  take: number;
  topicId: number;
  topicCommentId?: string;
  userId?: string;
}

export interface IFindManyTopicComment {
  topicComments: Partial<TopicComment>[];
  total: number;
}
