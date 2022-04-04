import {
  IFindManyAnswer,
  IFindManyAnswerProps,
} from './answers.repository.interface';
import { PrismaService } from '../../services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class AnswersRespository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.AnswerUncheckedCreateInput) {
    try {
      const inserted = await this.prismaService.answer.create({ data });
      return inserted;
    } catch (e) {
      console.log(e);
    }
  }

  async findMany({
    skip,
    take,
    questionId,
    userId,
  }: IFindManyAnswerProps): Promise<IFindManyAnswer> {
    const [answers, total] = await this.prismaService.$transaction([
      this.prismaService.answer.findMany({
        orderBy: {
          id: 'desc',
        },
        select: {
          answer: true,
          createdAt: true,
          id: true,
          // _count: {
          //   select: {
          //     Like: true,
          //     Comment: true,
          //   },
          // },
          user: {
            select: {
              username: true,
              firstName: true,
              lastName: true,
              photoUrl: true,
              id: true,
            },
          },
          question: {
            select: {
              question: true,
              id: true,
            },
          },
          // ...(userId
          //   ? {
          //       Like: {
          //         where: { userId },
          //       },
          //     }
          //   : {}),
        },
        skip,
        take,
        where: { questionId },
      }),
      this.prismaService.answer.count({
        where: { questionId },
      }),
    ]);

    return { answers, total };
  }

  // async findManyTrending({
  //   skip,
  //   take,
  //   forumId,
  //   userId,
  // }: IFindManyAnswerProps): Promise<any> {
  //   return this.prismaService.answer.findMany({
  //     orderBy: {
  //       id: 'desc',
  //     },
  //     select: {
  //       title: true,
  //       description: true,
  //       createdAt: true,
  //       id: true,
  //       views: true,
  //       share: true,
  //       _count: {
  //         select: {
  //           Like: true,
  //           Comment: true,
  //         },
  //       },
  //       user: {
  //         select: {
  //           username: true,
  //           firstName: true,
  //           lastName: true,
  //           photoUrl: true,
  //           id: true,
  //         },
  //       },
  //       forum: {
  //         select: {
  //           title: true,
  //           id: true,
  //         },
  //       },
  //       ...(userId
  //         ? {
  //             Like: {
  //               where: { userId },
  //             },
  //           }
  //         : {}),
  //     },
  //     take,
  //     where: { forumId },
  //   });
  // }

  // async findManyRelated({}: {}): Promise<any> {
  //   return this.prismaService.answer.findMany({
  //     orderBy: {
  //       id: 'desc',
  //     },
  //     select: {
  //       title: true,
  //       description: true,
  //       createdAt: true,
  //       id: true,
  //       views: true,
  //       share: true,
  //       _count: {
  //         select: {
  //           Like: true,
  //           Comment: true,
  //         },
  //       },
  //       user: {
  //         select: {
  //           username: true,
  //           firstName: true,
  //           lastName: true,
  //           photoUrl: true,
  //           id: true,
  //         },
  //       },
  //       forum: {
  //         select: {
  //           title: true,
  //           id: true,
  //         },
  //       },
  //     },
  //     take: 10,
  //   });
  // }

  // async findOneById(id: number, userId: string): Promise<Partial<Answer>> {
  //   console.log(id);
  //   const answer = await this.prismaService.answer.findFirst({
  //     where: { id },
  //     select: {
  //       title: true,
  //       description: true,
  //       createdAt: true,
  //       id: true,
  //       views: true,
  //       share: true,
  //       _count: {
  //         select: {
  //           Like: true,
  //           Comment: true,
  //         },
  //       },
  //       user: {
  //         select: {
  //           username: true,
  //           firstName: true,
  //           lastName: true,
  //           photoUrl: true,
  //           id: true,
  //         },
  //       },
  //       forum: {
  //         select: {
  //           title: true,
  //           id: true,
  //         },
  //       },
  //       ...(userId
  //         ? {
  //             Like: {
  //               where: { userId },
  //             },
  //           }
  //         : {}),
  //     },
  //   });
  //   console.log(answer);
  //   return answer;
  // }

  // async updateById({ id, data }: IUpdateAnswerProps): Promise<Answer> {
  //   const updated = await this.prismaService.answer.update({
  //     where: { id },
  //     data,
  //   });
  //   return updated;
  // }

  // async removeById(id: number): Promise<Answer> {
  //   const updated = await this.prismaService.answer.delete({ where: { id } });
  //   return updated;
  // }

  // async increaseViewById(id: number) {
  //   return this.prismaService.answer.update({
  //     where: { id },
  //     data: { views: { increment: 1 } },
  //   });
  // }

  // async increaseShareById(id: number) {
  //   return this.prismaService.answer.update({
  //     where: { id },
  //     data: { share: { increment: 1 } },
  //   });
  // }
}
