import { ELikes } from './../../config/constants';
import { CreateTopicLikeDto } from './dto/create-topic-like.dto';
export interface ICreateTopicLikesProps extends CreateTopicLikeDto {
  userId: string;
  topicId: number;
}

export interface IGetLikesProps {
  userId: string;
  topicId: number;
}

export interface IUnlikesProps {
  userId: string;
  topicId: number;
  type: ELikes;
}
