import { ENotificationType } from '@prisma/client';

export interface IQueryNotificationDto {
  page: string;
  type?: ENotificationType;
}
