import { HelperService } from './../../services/helper/helper.service';
import { IQueryNotificationDto } from './notification.interface';
import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationsRespository } from '../../repositories/notifications/notifications.repository';
import { PAGINATION_THRESHOLD } from '../../config/constants';

@Injectable()
export class NotificationsService {
  constructor(
    private notificationRepository: NotificationsRespository,
    private helperService: HelperService,
  ) {}

  create(createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }

  async findAll({ page }: IQueryNotificationDto) {
    const { notifications, total } = await this.notificationRepository.findMany(
      {
        ...this.helperService.paginate(+page),
      },
    );
    return {
      notifications,
      meta: { total, perPage: PAGINATION_THRESHOLD, currentPage: page },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
