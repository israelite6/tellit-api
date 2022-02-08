import {
  IFindManyTopic,
  IFindManyTopicProps,
  IUpdateTopicProps,
} from './topics.repository.interface';
import { PrismaService } from '../../services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Topic } from '@prisma/client';
import { ICreateTopicProps } from '../../app/topics/interface/topic-service.interface';

@Injectable()
export class TopicsRespository {
  constructor(private prismaService: PrismaService) {}

  async create(data: ICreateTopicProps) {
    const topic = data as unknown as Prisma.TopicCreateInput;
    try {
      const inserted = await this.prismaService.topic.create({ data: topic });
      return inserted;
    } catch (e) {
      console.log(e);
    }
  }

  async findMany({
    skip,
    take,
    forumId,
  }: IFindManyTopicProps): Promise<IFindManyTopic> {
    const [topics, total] = await this.prismaService.$transaction([
      this.prismaService.topic.findMany({
        orderBy: {
          id: 'desc',
        },
        select: {
          title: true,
          description: true,
          createdAt: true,
          id: true,
          views: true,
          user: {
            select: {
              username: true,
              firstName: true,
              lastName: true,
              photoUrl: true,
            },
          },
          forum: {
            select: {
              title: true,
              id: true,
            },
          },
        },
        skip,
        take,
        where: { forumId },
      }),
      this.prismaService.topic.count({
        where: { forumId },
      }),
    ]);

    return { topics, total };
  }

  async findOneById(id: number): Promise<Partial<Topic>> {
    console.log(id);
    const topic = await this.prismaService.topic.findFirst({
      where: { id },
      select: {
        title: true,
        description: true,
        createdAt: true,
        id: true,
        user: {
          select: {
            username: true,
          },
        },
        forum: {
          select: {
            title: true,
            id: true,
          },
        },
        views: true,
      },
    });
    console.log(topic);
    return topic;
  }

  async updateById({ id, data }: IUpdateTopicProps): Promise<Topic> {
    const updated = await this.prismaService.topic.update({
      where: { id },
      data,
    });
    return updated;
  }

  async removeById(id: number): Promise<Topic> {
    const updated = await this.prismaService.topic.delete({ where: { id } });
    return updated;
  }

  async increaseViewById(id: number) {
    return this.prismaService.topic.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
  }
}
