import { PrismaService } from '../../services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ICheckFollowQuestionExitProps } from './follow-question.repository.interface';

@Injectable()
export class FollowQuestionRespository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.FollowQuestionUncheckedCreateInput) {
    const exitFollowQuestions = await this.findUserIdAndId({
      userId: data.userId,
      questionId: data.questionId,
    });
    if (exitFollowQuestions.length > 0) {
      return { status: 'already' };
    }
    const inserted = await this.prismaService.followQuestion.create({ data });
    return inserted;
  }

  findUserIdAndId({ userId, questionId }: ICheckFollowQuestionExitProps) {
    return this.prismaService.followQuestion.findMany({
      where: {
        AND: [{ userId }, { questionId }],
      },
    });
  }

  removeByQuestionIdUserId({
    userId,
    questionId,
  }: ICheckFollowQuestionExitProps) {
    return this.prismaService.followQuestion.deleteMany({
      where: { AND: [{ userId }, { questionId }] },
    });
  }

  // async findManyTopicCount({
  //   topicId,
  //   topicCommentId,
  //   category,
  // }: IGetFollowQuestionsProps) {
  //   const [followQuestions, insightful, beer, threeGbosa] =
  //     await this.prismaService.$transaction([
  //       this.prismaService.followQuestion.count({
  //         where: {
  //           AND: [
  //             { topicId },
  //             { type: EFollowQuestionType.LIKE },
  //             { category },
  //             { topicCommentId },
  //           ],
  //         },
  //       }),
  //       this.prismaService.followQuestion.count({
  //         where: {
  //           AND: [
  //             { topicId },
  //             { type: EFollowQuestionType.INSIGHTFUL },
  //             { category },
  //             { topicCommentId },
  //           ],
  //         },
  //       }),
  //       this.prismaService.followQuestion.count({
  //         where: {
  //           AND: [
  //             { topicId },
  //             { type: EFollowQuestionType.BEER },
  //             { category },
  //             { topicCommentId },
  //           ],
  //         },
  //       }),
  //       this.prismaService.followQuestion.count({
  //         where: {
  //           AND: [
  //             { topicId },
  //             { type: EFollowQuestionType.THREE_GBOSA },
  //             { category },
  //             { topicCommentId },
  //           ],
  //         },
  //       }),
  //     ]);
  //   return { followQuestions, insightful, beer, threeGbosa };
  // }

  // async findMany(userId: string): Promise<Array<Partial<FollowQuestion>>> {
  //   const followQuestionies = await this.prismaService.followQuestion.findMany({
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

  //   return followQuestionies;
  // }

  // async updateById(
  //   id: string,
  //   data: Partial<FollowQuestion>,
  // ): Promise<FollowQuestion> {
  //   const updated = await this.prismaService.followQuestion.update({
  //     where: { id },
  //     data,
  //   });
  //   return updated;
  // }

  // async removeById(id: string): Promise<FollowQuestion> {
  //   const updated = await this.prismaService.followQuestion.delete({
  //     where: { id },
  //   });
  //   return updated;
  // }

  // async removeByUserIdAndTypeAndUserId({
  //   userId,
  //   type,
  //   topicId,
  //   category,
  //   topicCommentId,
  // }: IUnfollowQuestionsProps) {
  //   console.log(
  //     { userId },
  //     { type },
  //     { topicId },
  //     { category },
  //     { topicCommentId },
  //   );
  //   const deleted = await this.prismaService.followQuestion.deleteMany({
  //     where: {
  //       AND: [
  //         { userId },
  //         { type },
  //         { topicId },
  //         { category },
  //         { topicCommentId },
  //       ],
  //     },
  //   });
  //   return deleted;
  // }
}
