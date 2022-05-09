import { Test, TestingModule } from '@nestjs/testing';
import { TopicCommentsController } from './topic-comments.controller';
import { TopicCommentsService } from './topic-comments.service';

describe('TopicCommentsController', () => {
  let controller: TopicCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopicCommentsController],
      providers: [TopicCommentsService],
    }).compile();

    controller = module.get<TopicCommentsController>(TopicCommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
