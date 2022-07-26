// import {
//   IFindManyQuestion,
//   IFindManyQuestionProps,
//   IUpdateQuestionProps,
// } from './messages.repository.interface';
import { PrismaService } from '../../services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
// import { ICreateQuestionProp } from '../../app/questions/question.interface';
import {
  ICreateMessage,
  IFindMessage,
} from '../../app/messages/messages.interface';

@Injectable()
export class MessagesRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.MessageUncheckedCreateInput) {
    try {
      const inserted = await this.prismaService.message.create({
        data,
      });
      return inserted;
    } catch (e) {
      console.log(e);
    }
  }

  async findMany({
    skip,
    take,
    toUserId,
    fromUserId,
  }: IFindMessage): Promise<any> {
    console.log({
      skip,
      take,
      toUserId,
      fromUserId,
    });
    const [messages, total] = await this.prismaService.$transaction([
      this.prismaService.message.findMany({
        orderBy: {
          id: 'desc',
        },
        skip,
        take,
        where: {
          OR: [
            {
              toUserId,
              fromUserId,
            },
            {
              toUserId: fromUserId,
              fromUserId: toUserId,
            },
          ],
        },
        include: { fromUser: true },
      }),
      this.prismaService.message.count({
        where: {
          OR: [
            {
              toUserId,
              fromUserId,
            },
            {
              toUserId: fromUserId,
              fromUserId: toUserId,
            },
          ],
        },
      }),
    ]);

    return { messages, total };
  }

  //   async findManyRelated({ spaceId }: { spaceId: number }): Promise<any> {
  //     return this.prismaService.question.findMany({
  //       orderBy: {
  //         id: 'desc',
  //       },
  //       select: {
  //         question: true,
  //         createdAt: true,
  //         userId: true,
  //         _count: {
  //           select: {
  //             FollowQuestion: true,
  //           },
  //         },
  //         user: {
  //           select: {
  //             firstName: true,
  //             lastName: true,
  //             photoUrl: true,
  //           },
  //         },
  //         space: {
  //           select: {
  //             title: true,
  //           },
  //         },
  //         spaceId: true,
  //       },
  //       take: 10,
  //       where: {
  //         spaceId,
  //       },
  //     });
  //   }

  //   async findManyTrending({ spaceId }: { spaceId: number }): Promise<any> {
  //     return this.prismaService.question.findMany({
  //       orderBy: {
  //         id: 'desc',
  //       },
  //       select: {
  //         question: true,
  //         createdAt: true,
  //         userId: true,
  //         _count: {
  //           select: {
  //             FollowQuestion: true,
  //           },
  //         },
  //         user: {
  //           select: {
  //             firstName: true,
  //             lastName: true,
  //             photoUrl: true,
  //           },
  //         },
  //         space: {
  //           select: {
  //             title: true,
  //           },
  //         },
  //         spaceId: true,
  //       },
  //       take: 10,
  //       where: {
  //         spaceId,
  //       },
  //     });
  //   }

  //   async findOneById(id: number, userId?: string): Promise<Partial<Question>> {
  //     const question = await this.prismaService.question.findFirst({
  //       where: { id },
  //       select: {
  //         question: true,
  //         createdAt: true,
  //         userId: true,
  //         _count: {
  //           select: {
  //             FollowQuestion: true,
  //           },
  //         },
  //         user: {
  //           select: {
  //             firstName: true,
  //             lastName: true,
  //             photoUrl: true,
  //           },
  //         },
  //         space: {
  //           select: {
  //             title: true,
  //           },
  //         },
  //         spaceId: true,
  //       },
  //     });

  //     return question;
  //   }

  //   async updateById({ id, data }: IUpdateQuestionProps): Promise<Question> {
  //     const updated = await this.prismaService.question.update({
  //       where: { id },
  //       data,
  //     });
  //     return updated;
  //   }

  //   async removeById(id: number): Promise<Question> {
  //     const updated = await this.prismaService.question.delete({ where: { id } });
  //     return updated;
  //   }

  // async increaseViewById(id: number) {
  //   return this.prismaService.question.update({
  //     where: { id },
  //     data: { views: { increment: 1 } },
  //   });
  // }

  // async increaseShareById(id: number) {
  //   return this.prismaService.question.update({
  //     where: { id },
  //     data: { share: { increment: 1 } },
  //   });
  // }
}
