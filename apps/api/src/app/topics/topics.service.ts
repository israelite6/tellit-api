import { Injectable } from '@nestjs/common';
import { PAGINATION_THRESHOLD } from '../../config/constants';
import { TopicsRespository } from '../../repositories/topics/topics.repository';
import { HelperService } from '../../services/helper/helper.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { GetTopicDto } from './dto/get-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import {
  ICreateTopicProps,
  IFindAllTopic,
} from './interface/topic-service.interface';

@Injectable()
export class TopicsService {
  constructor(
    private topicsRepository: TopicsRespository,
    private helperService: HelperService,
  ) {}

  create(createTopicDto: ICreateTopicProps) {
    return this.topicsRepository.create(createTopicDto);
  }

  async findAll(query: GetTopicDto): Promise<IFindAllTopic> {
    const { topics, total } = await this.topicsRepository.findMany({
      ...this.helperService.paginate(query.page),
      forumId: +query.forumId || undefined,
    });

    return {
      topics,
      meta: { total, page: query.page, perPage: PAGINATION_THRESHOLD },
    };
  }

  findOne(id: number) {
    return this.topicsRepository.findOneById(id);
  }

  async update(id: number, updateTopicDto: UpdateTopicDto) {
    await this.topicsRepository.updateById({ id, data: updateTopicDto });
    return { description: 'Updated successfully' };
  }

  async remove(id: number) {
    await this.topicsRepository.removeById(id);

    return { description: 'Deleted successfully' };
  }

  async views(id: number) {
    await this.topicsRepository.increaseViewById(id);

    return { description: 'Operation successfully' };
  }
}
