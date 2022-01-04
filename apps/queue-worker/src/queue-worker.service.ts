import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueWorkerService {
  getHello(): string {
    return 'Hello World!';
  }
}
