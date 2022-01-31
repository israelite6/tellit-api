import { Test, TestingModule } from '@nestjs/testing';
import { EducationHistoriesController } from './education-histories.controller';
import { EducationHistoriesService } from './education-histories.service';

describe('EducationHistoriesController', () => {
  let controller: EducationHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationHistoriesController],
      providers: [EducationHistoriesService],
    }).compile();

    controller = module.get<EducationHistoriesController>(
      EducationHistoriesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
