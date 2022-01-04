import { Module } from '@nestjs/common';
import { QueueWorkerController } from './queue-worker.controller';
import { QueueWorkerService } from './queue-worker.service';

@Module({
  imports: [],
  controllers: [QueueWorkerController],
  providers: [QueueWorkerService],
})
export class QueueWorkerModule {}
