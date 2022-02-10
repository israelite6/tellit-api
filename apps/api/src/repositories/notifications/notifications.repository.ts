import {
  IFindManyNotification,
  IFindManyNotificationProps,
} from './notifications.repository.interface';
import { PrismaService } from '../../services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Notification } from '@prisma/client';

@Injectable()
export class NotificationsRespository {
  constructor(private prismaService: PrismaService) {}

  // async create(data: ICreateNotificationProps) {
  //   const notification = data as unknown as Prisma.NotificationCreateInput;
  //   try {
  //     const inserted = await this.prismaService.notification.create({
  //       data: notification,
  //     });
  //     return inserted;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  async findMany({
    skip,
    take,
  }: IFindManyNotificationProps): Promise<IFindManyNotification> {
    const [notifications, total] = await this.prismaService.$transaction([
      this.prismaService.notification.findMany({
        select: {
          title: true,
          description: true,
          url: true,
          createdAt: true,
          type: true,
          user: {
            select: {
              username: true,
              photoUrl: true,
              firstName: true,
              lastName: true,
            },
          },
        },
        skip,
        take,
      }),
      this.prismaService.notification.count({}),
    ]);

    return { notifications, total };
  }
}
