import { Test, TestingModule } from '@nestjs/testing';
import { WorkExperienceService } from './work-experience.service';

describe('WorkExperienceService', () => {
  let service: WorkExperienceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkExperienceService],
    }).compile();

    service = module.get<WorkExperienceService>(WorkExperienceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
