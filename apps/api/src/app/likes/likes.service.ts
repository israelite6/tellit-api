import { Injectable } from '@nestjs/common';
import { ELikeCategory } from '@prisma/client';
import { LikeRespository } from '../../repositories/likes/likes.repository';
import {
  ICreateLikesProps,
  IGetLikesProps,
  IUnlikesProps,
} from './likes.interface';

@Injectable()
export class LikesService {
  constructor(private topicLikeRepository: LikeRespository) {}

  create(createLikeDto: ICreateLikesProps) {
    return this.topicLikeRepository.create({
      ...createLikeDto,
    });
  }

  findAllCount(data: IGetLikesProps) {
    return this.topicLikeRepository.findManyTopicCount(data);
  }

  findOne(id: number) {
    return `This action returns a #${id} topicLike`;
  }

  // update(id: number, updateLikeDto: UpdateLikeDto) {
  //   return `This action updates a #${id} topicLike`;
  // }

  remove(data: IUnlikesProps) {
    return this.topicLikeRepository.removeByUserIdAndTypeAndUserId(data);
  }
}
