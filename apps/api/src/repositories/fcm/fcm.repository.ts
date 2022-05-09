import { PrismaService } from '../../services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Fcm } from '@prisma/client';

@Injectable()
export class FcmRespository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.FcmUncheckedCreateInput) {
    console.log(data);
    const getExist = await this.findManyByUserIdANDFcm(
      data.userId,
      data.deviceToken,
    );
    if (getExist.length > 0) {
      return {};
    }
    const inserted = await this.prismaService.fcm.create({ data });
    return inserted;
  }

  async findManyByUserIdANDFcm(userId: string, deviceToken: string) {
    const fcms = await this.prismaService.fcm.findMany({
      where: { AND: [{ userId }, { deviceToken }] },
    });
    return fcms;
  }

  async findMany(userId: string): Promise<Array<Partial<Fcm>>> {
    const fcmies = await this.prismaService.fcm.findMany({
      orderBy: {
        id: 'desc',
      },
      select: {
        os: true,
        deviceToken: true,
        userId: true,
      },
      where: { userId },
    });

    return fcmies;
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

  async updateById(id: string, data: Partial<Fcm>): Promise<Fcm> {
    const updated = await this.prismaService.fcm.update({
      where: { id },
      data,
    });
    return updated;
  }

  async removeById(id: string): Promise<Fcm> {
    const updated = await this.prismaService.fcm.delete({
      where: { id },
    });
    return updated;
  }
}
