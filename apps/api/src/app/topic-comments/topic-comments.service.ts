import { HelperService } from './../../services/helper/helper.service';
import {
  ICreateTopicCommentProps,
  IFindManyTopicCommentProps,
} from './topic-comment.interface';
import { TopicCommentsRespository } from './../../repositories/topics-comments/topics-comments.repository';
import { Injectable, Query } from '@nestjs/common';
import { CreateTopicCommentDto } from './dto/create-topic-comment.dto';
import { UpdateTopicCommentDto } from './dto/update-topic-comment.dto';
import { PAGINATION_THRESHOLD } from '../../config/constants';
import { Like, TopicComment } from '@prisma/client';

@Injectable()
export class TopicCommentsService {
  constructor(
    private topicCommentRepository: TopicCommentsRespository,
    private helperService: HelperService,
  ) {}

  create(data: ICreateTopicCommentProps) {
    return this.topicCommentRepository.create(data);
  }

  async findAll(data: IFindManyTopicCommentProps) {
    const { total, topicComments } = await this.topicCommentRepository.findMany(
      {
        ...this.helperService.paginate(data.page),
        topicId: data.topicId,
        topicCommentId: data.topicCommentId,
        userId: data.userId,
        type: data.type,
        answerId: data.answerId,
      },
    );

    const mappedComment = topicComments.map(
      (comment: TopicComment & { Like: Like[] }) => {
        const isLiked = comment.Like?.length > 0 ? true : false;
        return {
          ...comment,
          Like: undefined,
          isLiked,
        };
      },
    );

    return {
      topicComments: mappedComment,
      meta: {
        total,
        perPage: PAGINATION_THRESHOLD,
        currentPage: data.page,
        numberOfPages: Math.ceil(total / PAGINATION_THRESHOLD),
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} topicComment`;
  }

  update(id: string, updateTopicCommentDto: UpdateTopicCommentDto) {
    return this.topicCommentRepository.updateById({
      id,
      data: updateTopicCommentDto,
    });
  }

  remove(id: string) {
    return this.topicCommentRepository.removeById(id);
    return `This action removes a #${id} topicComment`;
  }
}
