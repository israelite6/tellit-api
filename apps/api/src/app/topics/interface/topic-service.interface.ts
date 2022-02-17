import { Topic } from '@prisma/client';
import { GetTopicDto } from '../dto/get-topic.dto';
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

export interface IGetTopicProps extends GetTopicDto {
  userId?: string;
}
