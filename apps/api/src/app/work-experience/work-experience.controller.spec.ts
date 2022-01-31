import { Test, TestingModule } from '@nestjs/testing';
import { WorkExperienceController } from './work-experience.controller';
import { WorkExperienceService } from './work-experience.service';

describe('WorkExperienceController', () => {
  let controller: WorkExperienceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkExperienceController],
      providers: [WorkExperienceService],
    }).compile();

    controller = module.get<WorkExperienceController>(WorkExperienceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
