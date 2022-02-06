import { ELikeCategory, ELikeType } from '@prisma/client';
import { CreateLikeDto } from './dto/create-like.dto';
export interface ICreateLikesProps extends CreateLikeDto {
  userId: string;
  topicId?: number | bigint;
  topicCommentId?: string;
  category: ELikeCategory;
}

export interface IGetLikesProps {
  topicId?: number | bigint;
  topicCommentId?: string;
  category: ELikeCategory;
}

export interface IUnlikesProps {
  userId: string;
  topicId?: number | bigint;
  type: ELikeType;
  category: ELikeCategory;
  topicCommentId?: string;
}
