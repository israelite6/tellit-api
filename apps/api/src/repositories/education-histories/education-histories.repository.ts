import {
  IFindManyEducationHistory,
  IFindManyEducationHistoryProps,
  IUpdateEducationHistoryProps,
} from './education-histories.repository.interface';
import { PrismaService } from '../../services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, EducationHistory } from '@prisma/client';

@Injectable()
export class EducationHistoriesRespository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.EducationHistoryUncheckedCreateInput) {
    console.log(data);
    const inserted = await this.prismaService.educationHistory.create({ data });
    return inserted;
  }

  async findMany(userId: string): Promise<Array<Partial<EducationHistory>>> {
    const educationHistoryies =
      await this.prismaService.educationHistory.findMany({
        orderBy: {
          id: 'desc',
        },
        select: {
          degree: true,
          course: true,
          schoolName: true,
          isCurrent: true,
          startAt: true,
          endAt: true,
          createdAt: true,
          id: true,
        },
        where: { userId },
      });

    return educationHistoryies;
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
  }: IUpdateEducationHistoryProps): Promise<EducationHistory> {
    const updated = await this.prismaService.educationHistory.update({
      where: { id },
      data,
    });
    return updated;
  }

  async removeById(id: string): Promise<EducationHistory> {
    const updated = await this.prismaService.educationHistory.delete({
      where: { id },
    });
    return updated;
  }
}
