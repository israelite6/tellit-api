import {
  IFindManyTopicComment,
  IFindManyTopicCommentProps,
  IUpdateTopicCommentProps,
} from './topic-comments.repository.interface';
import { PrismaService } from '../../services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, TopicComment } from '@prisma/client';

@Injectable()
export class TopicCommentsRespository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.TopicCommentUncheckedCreateInput) {
    const inserted = await this.prismaService.topicComment.create({ data });
    return inserted;
  }

  async findMany({
    skip,
    take,
    topicId,
    topicCommentId,
    userId,
    type,
    answerId,
  }: IFindManyTopicCommentProps): Promise<IFindManyTopicComment> {
    const [topicComments, total] = await this.prismaService.$transaction([
      this.prismaService.topicComment.findMany({
        orderBy: {
          id: 'desc',
        },
        select: {
          comment: true,
          isAnonymous: true,
          createdAt: true,
          id: true,
          topicCommentId: true,
          user: {
            select: {
              username: true,
              firstName: true,
              lastName: true,
              photoUrl: true,
              id: true,
            },
          },
          _count: {
            select: {
              Like: true,
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
        where: {
          AND: [
            { topicId },
            ...(topicCommentId
              ? [{ topicCommentId }]
              : [{ topicCommentId: null }]),
            { type },
            { answerId },
          ],
        },
      }),
      this.prismaService.topicComment.count({
        where: {
          AND: [
            { topicId },
            ...(topicCommentId
              ? [{ NOT: [{ topicCommentId: null }] }]
              : [{ topicCommentId: null }]),
            { type },
            { answerId },
          ],
        },
      }),
    ]);

    return { topicComments, total };
  }

  // async findOneById(id: number): Promise<Partial<Topic>> {
  //   console.log(id);
  //   const topic = await this.prismaService.topic.findFirst({
  //     where: { id },
  //     select: {
  //       title: true,
  //       description: true,
  //       createdAt: true,
  //       id: true,
  //       user: {
  //         select: {
  //           username: true,
  //         },
  //       },
  //       forum: {
  //         select: {
  //           title: true,
  //         },
  //       },
  //       views: true,
  //     },
  //   });
  //   console.log(topic);
  //   return topic;
  // }

  async updateById({
    id,
    data,
  }: IUpdateTopicCommentProps): Promise<TopicComment> {
    const updated = await this.prismaService.topicComment.update({
      where: { id },
      data,
    });
    return updated;
  }

  async removeById(id: string): Promise<TopicComment> {
    const updated = await this.prismaService.topicComment.delete({
      where: { id },
    });
    return updated;
  }
}
