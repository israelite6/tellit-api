import { Test, TestingModule } from '@nestjs/testing';
import { TopicCommentsService } from './topic-comments.service';

describe('TopicCommentsService', () => {
  let service: TopicCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicCommentsService],
    }).compile();

    service = module.get<TopicCommentsService>(TopicCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
