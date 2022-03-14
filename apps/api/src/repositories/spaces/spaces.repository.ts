import { IUpdateProps } from './spaces.repository.interface';
import { PrismaService } from '../../services/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, Space } from '@prisma/client';

@Injectable()
export class SpacesRespository {
  constructor(private prismaService: PrismaService) {}

  // async create(data: Prisma.SpaceCreateInput) {
  //   try {
  //     const inserted = await this.prismaService.space.create({ data });
  //     return inserted;
  //   } catch (e) {
  //     const [target] = e.meta.target;
  //     if (e.code === 'P2002' && target === 'title') {
  //       throw new BadRequestException('Space already exist');
  //     }
  //     throw new BadRequestException(e.message);
  //   }
  // }

  async findMany(): Promise<Partial<Space>[]> {
    const spaces = await this.prismaService.space.findMany({
      select: {
        title: true,
        description: true,
        createdAt: true,
        iconUrl: true,
        bannarUrl: true,
        id: true,
        // _count: {
        //   select: {
        //     Topic: true,
        //   },
        // },
      },
    });
    return spaces;
  }

  // async findOneById(id: number): Promise<Partial<Space>> {
  //   const spaces = await this.prismaService.space.findFirst({
  //     where: { id },
  //     select: {
  //       title: true,
  //       description: true,
  //       createdAt: true,
  //       iconUrl: true,
  //       bannarUrl: true,
  //       id: true,
  //     },
  //   });
  //   return spaces;
  // }

  // async updateById({ id, data }: IUpdateProps): Promise<Space> {
  //   const updated = await this.prismaService.space.update({
  //     where: { id },
  //     data,
  //   });
  //   return updated;
  // }

  // async removeById(id: number): Promise<Space> {
  //   const updated = await this.prismaService.space.delete({ where: { id } });
  //   return updated;
  // }
}
