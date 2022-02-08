import { Topic } from '@prisma/client';
export interface ICreateTopicProps {
  title: string;
  description: string;
  forumId: number;
  userId: string;
}

export interface IFindAllTopic {
  topics: Partial<Topic>[];
  meta: {
    total: number;
    currentPage: number;
    perPage: number;
    numberOfPages: number;
  };
}
