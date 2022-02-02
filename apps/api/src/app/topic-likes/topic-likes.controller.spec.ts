import { Test, TestingModule } from '@nestjs/testing';
import { TopicLikesController } from './topic-likes.controller';
import { TopicLikesService } from './topic-likes.service';

describe('TopicLikesController', () => {
  let controller: TopicLikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopicLikesController],
      providers: [TopicLikesService],
    }).compile();

    controller = module.get<TopicLikesController>(TopicLikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
