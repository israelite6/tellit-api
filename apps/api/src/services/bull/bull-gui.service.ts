import { Injectable } from '@nestjs/common';
import { SEND_EMAIL_QUEUE_NAME } from '../../config/constants';
import { Queue } from 'bull';

import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class BullUIService {
  constructor(
    @InjectQueue(SEND_EMAIL_QUEUE_NAME) private readonly sendEmailQueue: Queue,
  ) {
    // setQueues([sendEmailQueue]);
  }
}
