import { ELikeType } from '@prisma/client';
import { CreateTopicLikeDto } from './dto/create-topic-like.dto';
export interface ICreateTopicLikesProps extends CreateTopicLikeDto {
  userId: string;
  topicId: number | bigint;
}

export interface IGetLikesProps {
  userId: string;
  topicId: number | bigint;
}

export interface IUnlikesProps {
  userId: string;
  topicId: number | bigint;
  type: ELikeType;
}
