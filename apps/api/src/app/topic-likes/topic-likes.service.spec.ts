import { Test, TestingModule } from '@nestjs/testing';
import { TopicLikesService } from './topic-likes.service';

describe('TopicLikesService', () => {
  let service: TopicLikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicLikesService],
    }).compile();

    service = module.get<TopicLikesService>(TopicLikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
