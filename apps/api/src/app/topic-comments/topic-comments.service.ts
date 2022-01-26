import { HelperService } from './../../services/helper/helper.service';
import {
  ICreateTopicCommentProps,
  IFindManyTopicCommentProps,
} from './topic-comment.interface';
import { TopicCommentsRespository } from './../../repositories/topics-comments/topics-comments.repository';
import { Injectable, Query } from '@nestjs/common';
import { CreateTopicCommentDto } from './dto/create-topic-comment.dto';
import { UpdateTopicCommentDto } from './dto/update-topic-comment.dto';

@Injectable()
export class TopicCommentsService {
  constructor(
    private topicCommentRepository: TopicCommentsRespository,
    private helperService: HelperService,
  ) {}

  create(data: ICreateTopicCommentProps) {
    return this.topicCommentRepository.create(data);
  }

  findAll(data: IFindManyTopicCommentProps) {
    return this.topicCommentRepository.findMany({
      ...this.helperService.paginate(data.page),
      topicId: data.topicId,
      topicCommentId: data.topicCommentId,
    });
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
