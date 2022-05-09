import {
  IFindManyTopic,
  IFindManyTopicProps,
  IUpdateTopicProps,
} from './topics.repository.interface';
import { PrismaService } from '../../services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Topic } from '@prisma/client';
import { ICreateTopicProps } from '../../app/topics/interface/topic-service.interface';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

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
    userId,
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
          share: true,
          _count: {
            select: {
              Like: true,
              Comment: true,
            },
          },
          user: {
            select: {
              username: true,
              firstName: true,
              lastName: true,
              photoUrl: true,
              id: true,
            },
          },
          forum: {
            select: {
              title: true,
              id: true,
            },
          },
          ...(userId
            ? {
                Like: {
                  where: { userId },
                },
              }
            : {}),
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

  async findManyTrending({
    skip,
    take,
    forumId,
    userId,
  }: IFindManyTopicProps): Promise<any> {
    return this.prismaService.topic.findMany({
      orderBy: {
        id: 'desc',
      },
      select: {
        title: true,
        description: true,
        createdAt: true,
        id: true,
        views: true,
        share: true,
        _count: {
          select: {
            Like: true,
            Comment: true,
          },
        },
        user: {
          select: {
            username: true,
            firstName: true,
            lastName: true,
            photoUrl: true,
            id: true,
          },
        },
        forum: {
          select: {
            title: true,
            id: true,
          },
        },
        ...(userId
          ? {
              Like: {
                where: { userId },
              },
            }
          : {}),
      },
      take,
      where: { forumId },
    });
  }

  async findManyRelated({}: {}): Promise<any> {
    return this.prismaService.topic.findMany({
      orderBy: {
        id: 'desc',
      },
      select: {
        title: true,
        description: true,
        createdAt: true,
        id: true,
        views: true,
        share: true,
        _count: {
          select: {
            Like: true,
            Comment: true,
          },
        },
        user: {
          select: {
            username: true,
            firstName: true,
            lastName: true,
            photoUrl: true,
            id: true,
          },
        },
        forum: {
          select: {
            title: true,
            id: true,
          },
        },
      },
      take: 10,
    });
  }

  async findOneById(id: number, userId: string): Promise<Partial<Topic>> {
    console.log(id);
    const topic = await this.prismaService.topic.findFirst({
      where: { id },
      select: {
        title: true,
        description: true,
        createdAt: true,
        id: true,
        views: true,
        share: true,
        _count: {
          select: {
            Like: true,
            Comment: true,
          },
        },
        user: {
          select: {
            username: true,
            firstName: true,
            lastName: true,
            photoUrl: true,
            id: true,
          },
        },
        forum: {
          select: {
            title: true,
            id: true,
          },
        },
        ...(userId
          ? {
              Like: {
                where: { userId },
              },
            }
          : {}),
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

  async increaseShareById(id: number) {
    return this.prismaService.topic.update({
      where: { id },
      data: { share: { increment: 1 } },
    });
  }
}
