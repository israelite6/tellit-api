import { Injectable } from '@nestjs/common';
import { Like, Topic } from '@prisma/client';
import { PAGINATION_THRESHOLD } from '../../config/constants';
import { TopicsRespository } from '../../repositories/topics/topics.repository';
import { HelperService } from '../../services/helper/helper.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { GetTopicDto } from './dto/get-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import {
  ICreateTopicProps,
  IFindAllTopic,
  IGetTopicProps,
  IRelatedPostProps,
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

  async findAll(query: IGetTopicProps): Promise<IFindAllTopic> {
    const { topics, total } = await this.topicsRepository.findMany({
      ...this.helperService.paginate(query.page),
      forumId: +query.forumId || undefined,
      userId: query.userId,
    });

    const mappedTopic = topics.map((topic: Topic & { Like: Like[] }) => {
      const isLiked = topic.Like?.length > 0 ? true : false;
      return {
        ...topic,
        Like: undefined,
        isLiked,
      };
    });

    return {
      topics: mappedTopic,
      meta: {
        total,
        currentPage: query.page,
        perPage: PAGINATION_THRESHOLD,
        numberOfPages: Math.ceil(total / PAGINATION_THRESHOLD),
      },
    };
  }

  async findTrending(query: IGetTopicProps): Promise<any> {
    const topics = await this.topicsRepository.findManyTrending({
      ...this.helperService.paginate(query.page),
      forumId: +query.forumId || undefined,
      userId: query.userId,
    });
    return topics;
  }

  async findRelated({ id }: IRelatedPostProps): Promise<any> {
    const topics = await this.topicsRepository.findManyRelated({});
    return topics;
  }

  async findOne(id: number, userId: string) {
    console.log(userId);
    const topic = (await this.topicsRepository.findOneById(
      id,
      userId,
    )) as Topic & { isLiked: boolean; Like: Like[] };
    topic.isLiked = topic.Like.length > 0 ? true : false;
    delete topic.Like;
    return topic;
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

  async share(id: number) {
    await this.topicsRepository.increaseShareById(id);

    return { description: 'Operation successfully' };
  }
}
