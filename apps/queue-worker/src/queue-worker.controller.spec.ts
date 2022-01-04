import { Test, TestingModule } from '@nestjs/testing';
import { QueueWorkerController } from './queue-worker.controller';
import { QueueWorkerService } from './queue-worker.service';

describe('QueueWorkerController', () => {
  let queueWorkerController: QueueWorkerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [QueueWorkerController],
      providers: [QueueWorkerService],
    }).compile();

    queueWorkerController = app.get<QueueWorkerController>(QueueWorkerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(queueWorkerController.getHello()).toBe('Hello World!');
    });
  });
});
