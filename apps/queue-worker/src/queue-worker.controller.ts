import { Controller, Get } from '@nestjs/common';
import { QueueWorkerService } from './queue-worker.service';

@Controller()
export class QueueWorkerController {
  constructor(private readonly queueWorkerService: QueueWorkerService) {}

  @Get()
  getHello(): string {
    return this.queueWorkerService.getHello();
  }
}
