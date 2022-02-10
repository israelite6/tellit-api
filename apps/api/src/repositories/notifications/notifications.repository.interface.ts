import { Prisma, Notification } from '@prisma/client';
export interface IUpdateNotificationProps {
  id: number;
  data: Partial<Prisma.NotificationCreateInput>;
}

export interface IFindManyNotificationProps {
  skip: number;
  take: number;
  userId?: string;
}

export interface IFindManyNotification {
  notifications: Partial<Notification>[];
  total: number;
}
