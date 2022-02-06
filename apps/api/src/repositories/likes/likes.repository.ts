import {
  IGetLikesProps,
  IUnlikesProps,
} from './../../app/likes/likes.interface';
import { PrismaService } from '../../services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ELikeType, Prisma, Like } from '@prisma/client';
import { ICheckExitProps } from './likes.repository.interface';

@Injectable()
export class LikeRespository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.LikeUncheckedCreateInput) {
    const exitLikes = await this.findUserIdAndId({
      userId: data.userId,
      topicId: data.topicId,
      type: data.type,
      category: data.category,
      topicCommentId: data.topicCommentId,
    });
    if (exitLikes.length > 0) {
      return { status: 'already' };
    }
    const inserted = await this.prismaService.like.create({ data });
    return inserted;
  }

  findUserIdAndId({
    userId,
    topicId,
    type,
    category,
    topicCommentId,
  }: ICheckExitProps) {
    return this.prismaService.like.findMany({
      where: {
        AND: [
          { userId },
          { topicId },
          { type },
          { category },
          { topicCommentId },
        ],
      },
    });
  }

  async findManyTopicCount({
    topicId,
    topicCommentId,
    category,
  }: IGetLikesProps) {
    const [likes, insightful, beer, threeGbosa] =
      await this.prismaService.$transaction([
        this.prismaService.like.count({
          where: {
            AND: [
              { topicId },
              { type: ELikeType.LIKE },
              { category },
              { topicCommentId },
            ],
          },
        }),
        this.prismaService.like.count({
          where: {
            AND: [
              { topicId },
              { type: ELikeType.INSIGHTFUL },
              { category },
              { topicCommentId },
            ],
          },
        }),
        this.prismaService.like.count({
          where: {
            AND: [
              { topicId },
              { type: ELikeType.BEER },
              { category },
              { topicCommentId },
            ],
          },
        }),
        this.prismaService.like.count({
          where: {
            AND: [
              { topicId },
              { type: ELikeType.THREE_GBOSA },
              { category },
              { topicCommentId },
            ],
          },
        }),
      ]);
    return { likes, insightful, beer, threeGbosa };
  }

  // async findMany(userId: string): Promise<Array<Partial<Like>>> {
  //   const likeies = await this.prismaService.like.findMany({
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

  //   return likeies;
  // }

  async updateById(id: string, data: Partial<Like>): Promise<Like> {
    const updated = await this.prismaService.like.update({
      where: { id },
      data,
    });
    return updated;
  }

  async removeById(id: string): Promise<Like> {
    const updated = await this.prismaService.like.delete({
      where: { id },
    });
    return updated;
  }

  async removeByUserIdAndTypeAndUserId({
    userId,
    type,
    topicId,
    category,
    topicCommentId,
  }: IUnlikesProps) {
    console.log(
      { userId },
      { type },
      { topicId },
      { category },
      { topicCommentId },
    );
    const deleted = await this.prismaService.like.deleteMany({
      where: {
        AND: [
          { userId },
          { type },
          { topicId },
          { category },
          { topicCommentId },
        ],
      },
    });
    return deleted;
  }
}
