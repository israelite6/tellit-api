import { Prisma, Topic } from '@prisma/client';
export interface IUpdateTopicProps {
  id: number;
  data: Partial<Prisma.TopicCreateInput>;
}

export interface IFindManyTopicProps {
  skip: number;
  take: number;
  forumId?: number;
}

export interface IFindManyTopic {
  topics: Partial<Topic>[];
  total: number;
}
