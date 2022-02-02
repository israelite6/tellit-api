import { Injectable } from '@nestjs/common';
import { TopicLikeRespository } from '../../repositories/topic-likes/topic-likes.repository';
import { CreateTopicLikeDto } from './dto/create-topic-like.dto';
import { UpdateTopicLikeDto } from './dto/update-topic-like.dto';
import {
  ICreateTopicLikesProps,
  IGetLikesProps,
  IUnlikesProps,
} from './topic-likes.interface';

@Injectable()
export class TopicLikesService {
  constructor(private topicLikeRepository: TopicLikeRespository) {}

  create(createTopicLikeDto: ICreateTopicLikesProps) {
    return this.topicLikeRepository.create(createTopicLikeDto);
  }

  findAllCount(data: IGetLikesProps) {
    return this.topicLikeRepository.findManyCount(data);
  }

  findOne(id: number) {
    return `This action returns a #${id} topicLike`;
  }

  update(id: number, updateTopicLikeDto: UpdateTopicLikeDto) {
    return `This action updates a #${id} topicLike`;
  }

  remove(data: IUnlikesProps) {
    return this.topicLikeRepository.removeByUserIdAndTypeAndUserId(data);
  }
}
