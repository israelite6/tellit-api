import { EducationHistoriesRespository } from './../../repositories/education-histories/education-histories.repository';
import { Module } from '@nestjs/common';
import { EducationHistoriesService } from './education-histories.service';
import { EducationHistoriesController } from './education-histories.controller';

@Module({
  controllers: [EducationHistoriesController],
  providers: [EducationHistoriesService, EducationHistoriesRespository],
})
export class EducationHistoriesModule {}
