import { Test, TestingModule } from '@nestjs/testing';
import { EducationHistoriesService } from './education-histories.service';

describe('EducationHistoriesService', () => {
  let service: EducationHistoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducationHistoriesService],
    }).compile();

    service = module.get<EducationHistoriesService>(EducationHistoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
