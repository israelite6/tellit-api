import {
  IGetLikesProps,
  IUnlikesProps,
} from './../../app/topic-likes/topic-likes.interface';
import { PrismaService } from '../../services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ELikeType, Prisma, TopicLike } from '@prisma/client';

@Injectable()
export class TopicLikeRespository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.TopicLikeUncheckedCreateInput) {
    const exitLikes = await this.findUserIdAndTopicId(
      data.userId,
      data.topicId,
      data.type,
    );
    if (exitLikes.length > 0) {
      return { status: 'already' };
    }
    const inserted = await this.prismaService.topicLike.create({ data });
    return inserted;
  }

  findUserIdAndTopicId(
    userId: string,
    topicId: number | bigint,
    type: ELikeType,
  ) {
    return this.prismaService.topicLike.findMany({
      where: { AND: [{ userId }, { topicId }, { type }] },
    });
  }

  async findManyCount({ userId, topicId }: IGetLikesProps) {
    const [likes, insightful, beer, threeGbosa] =
      await this.prismaService.$transaction([
        this.prismaService.topicLike.count({
          where: { AND: [{ userId }, { topicId }, { type: ELikeType.LIKE }] },
        }),
        this.prismaService.topicLike.count({
          where: {
            AND: [{ userId }, { topicId }, { type: ELikeType.INSIGHTFUL }],
          },
        }),
        this.prismaService.topicLike.count({
          where: { AND: [{ userId }, { topicId }, { type: ELikeType.BEER }] },
        }),
        this.prismaService.topicLike.count({
          where: {
            AND: [{ userId }, { topicId }, { type: ELikeType.THREE_GBOSA }],
          },
        }),
      ]);
    return { likes, insightful, beer, threeGbosa };
  }

  // async findMany(userId: string): Promise<Array<Partial<TopicLike>>> {
  //   const topicLikeies = await this.prismaService.topicLike.findMany({
  //     orderBy: {
  //       id: 'desc',
  //     },
  //     select: {
  //       type: true,
  //       title: true,
  //       companyName: true,
  //       isCurrent: true,
  //       startAt: true,
  //       endAt: true,
  //       createdAt: true,
  //       id: true,
  //       location: true,
  //     },
  //     where: { userId },
  //   });

  //   return topicLikeies;
  // }

  async updateById(id: string, data: Partial<TopicLike>): Promise<TopicLike> {
    const updated = await this.prismaService.topicLike.update({
      where: { id },
      data,
    });
    return updated;
  }

  async removeById(id: string): Promise<TopicLike> {
    const updated = await this.prismaService.topicLike.delete({
      where: { id },
    });
    return updated;
  }

  async removeByUserIdAndTypeAndUserId({
    userId,
    type,
    topicId,
  }: IUnlikesProps) {
    const deleted = await this.prismaService.topicLike.deleteMany({
      where: { AND: [{ userId }, { type }, { topicId }] },
    });
    return deleted;
  }
}
