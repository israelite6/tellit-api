import {
  IFindManyQuestion,
  IFindManyQuestionProps,
  IUpdateQuestionProps,
} from './questions.repository.interface';
import { PrismaService } from '../../services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Question } from '@prisma/client';
import { ICreateQuestionProp } from '../../app/questions/question.interface';

@Injectable()
export class QuestionsRespository {
  constructor(private prismaService: PrismaService) {}

  async create(data: ICreateQuestionProp) {
    const question = data as unknown as Prisma.QuestionCreateInput;
    try {
      const inserted = await this.prismaService.question.create({
        data: question,
      });
      return inserted;
    } catch (e) {
      console.log(e);
    }
  }

  async findMany({
    skip,
    take,
    spaceId,
  }: IFindManyQuestionProps): Promise<IFindManyQuestion> {
    console.log({
      skip,
      take,
      spaceId,
    });
    const [questions, total] = await this.prismaService.$transaction([
      this.prismaService.question.findMany({
        orderBy: {
          id: 'desc',
        },
        select: {
          question: true,
          createdAt: true,
          userId: true,
          _count: {
            select: {
              FollowQuestion: true,
              Answer: true,
            },
          },
          user: {
            select: {
              firstName: true,
              lastName: true,
              photoUrl: true,
            },
          },
          space: {
            select: {
              title: true,
            },
          },
          spaceId: true,
          id: true,
        },
        skip,
        take,
        where: { spaceId },
      }),
      this.prismaService.question.count({
        where: { spaceId },
      }),
    ]);

    return { questions, total };
  }

  async findManyRelated({ spaceId }: { spaceId: number }): Promise<any> {
    return this.prismaService.question.findMany({
      orderBy: {
        id: 'desc',
      },
      select: {
        question: true,
        createdAt: true,
        userId: true,
        _count: {
          select: {
            FollowQuestion: true,
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            photoUrl: true,
          },
        },
        space: {
          select: {
            title: true,
          },
        },
        spaceId: true,
      },
      take: 10,
      where: {
        spaceId,
      },
    });
  }

  async findManyTrending({ spaceId }: { spaceId: number }): Promise<any> {
    return this.prismaService.question.findMany({
      orderBy: {
        id: 'desc',
      },
      select: {
        question: true,
        createdAt: true,
        userId: true,
        _count: {
          select: {
            FollowQuestion: true,
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            photoUrl: true,
          },
        },
        space: {
          select: {
            title: true,
          },
        },
        spaceId: true,
      },
      take: 10,
      where: {
        spaceId,
      },
    });
  }

  async findOneById(id: number, userId?: string): Promise<Partial<Question>> {
    const question = await this.prismaService.question.findFirst({
      where: { id },
      select: {
        question: true,
        createdAt: true,
        userId: true,
        _count: {
          select: {
            FollowQuestion: true,
            Answer: true,
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            photoUrl: true,
          },
        },
        space: {
          select: {
            title: true,
          },
        },
        spaceId: true,
      },
    });

    return question;
  }

  async updateById({ id, data }: IUpdateQuestionProps): Promise<Question> {
    const updated = await this.prismaService.question.update({
      where: { id },
      data,
    });
    return updated;
  }

  async removeById(id: number): Promise<Question> {
    const updated = await this.prismaService.question.delete({ where: { id } });
    return updated;
  }

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
