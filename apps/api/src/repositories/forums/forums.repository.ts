import { IUpdateProps } from './forums.repository.interface';
import { PrismaService } from '../../services/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, Forum } from '@prisma/client';

@Injectable()
export class ForumsRespository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.ForumCreateInput) {
    try {
      const inserted = await this.prismaService.forum.create({ data });
      return inserted;
    } catch (e) {
      const [target] = e.meta.target;
      if (e.code === 'P2002' && target === 'title') {
        throw new BadRequestException('Title already exist');
      }
      throw new BadRequestException(e.message);
    }
  }

  async findMany(): Promise<Partial<Forum>[]> {
    const forums = await this.prismaService.forum.findMany({
      select: {
        title: true,
        description: true,
        createdAt: true,
        iconUrl: true,
        bannarUrl: true,
        id: true,
        _count: {
          select: {
            Topic: true,
          },
        },
      },
    });
    return forums;
  }

  async findOneById(id: number): Promise<Partial<Forum>> {
    const forums = await this.prismaService.forum.findFirst({
      where: { id },
      select: {
        title: true,
        description: true,
        createdAt: true,
        iconUrl: true,
        bannarUrl: true,
        id: true,
      },
    });
    return forums;
  }

  async updateById({ id, data }: IUpdateProps): Promise<Forum> {
    const updated = await this.prismaService.forum.update({
      where: { id },
      data,
    });
    return updated;
  }

  async removeById(id: number): Promise<Forum> {
    const updated = await this.prismaService.forum.delete({ where: { id } });
    return updated;
  }
}
