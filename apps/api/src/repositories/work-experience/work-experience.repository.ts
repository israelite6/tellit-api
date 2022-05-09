import { PrismaService } from '../../services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, WorkExperience } from '@prisma/client';

@Injectable()
export class WorkExperienceRespository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.WorkExperienceUncheckedCreateInput) {
    console.log(data);
    const inserted = await this.prismaService.workExperience.create({ data });
    return inserted;
  }

  async findMany(userId: string): Promise<Array<Partial<WorkExperience>>> {
    const workExperienceies = await this.prismaService.workExperience.findMany({
      orderBy: {
        id: 'desc',
      },
      select: {
        type: true,
        title: true,
        companyName: true,
        isCurrent: true,
        startMonth: true,
        startYear: true,
        endMonth: true,
        endYear: true,
        createdAt: true,
        id: true,
        location: true,
      },
      where: { userId },
    });

    return workExperienceies;
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

  async updateById(
    id: string,
    data: Partial<WorkExperience>,
  ): Promise<WorkExperience> {
    const updated = await this.prismaService.workExperience.update({
      where: { id },
      data,
    });
    return updated;
  }

  async removeById(id: string): Promise<WorkExperience> {
    const updated = await this.prismaService.workExperience.delete({
      where: { id },
    });
    return updated;
  }
}
