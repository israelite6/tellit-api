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
export class UserMessagesRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.UserMessageUncheckedCreateInput) {
    const doc = { ...data, updatedAt: new Date() };
    try {
      const inserted = await this.prismaService.userMessage.create({
        data: doc,
      });
      return inserted;
    } catch (e) {
      console.log(e);
    }
  }
  async findMessageConnection({ toUserId, fromUserId }): Promise<any> {
    const connection = await this.prismaService.userMessage.findFirst({
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
    });
    return connection;
  }

  async updateMessageConnection({ toUserId, fromUserId }) {
    const updated = await this.prismaService.userMessage.updateMany({
      data: {
        updatedAt: new Date(),
      },
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
    });
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
    const messages = await this.prismaService.message.findMany({
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
    });

    return messages;
  }
  async findAllMessage({
    skip,
    take,
    fromUserId,
  }: Exclude<IFindMessage, 'toUserId'>): Promise<any> {
    console.log({
      skip,
      take,
      fromUserId,
    });
    const [messages, total] = await this.prismaService.$transaction([
      this.prismaService.userMessage.findMany({
        orderBy: {
          updatedAt: 'desc',
        },
        skip,
        take,
        where: {
          OR: [
            {
              fromUserId,
            },
            {
              toUserId: fromUserId,
            },
          ],
        },
      }),
      this.prismaService.userMessage.count({
        where: {
          OR: [
            {
              fromUserId,
            },
            {
              toUserId: fromUserId,
            },
          ],
        },
      }),
    ]);
    const allMessages = await Promise.all(
      await messages.map(async (item) => {
        const { toUserId, fromUserId } = item;
        const lastMessage = await this.findMany({
          skip: 0,
          take: 1,
          toUserId,
          fromUserId,
        });
        return { ...item, message: lastMessage };
      }),
    );
    return { allMessages, total };
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
