import { Module } from '@nestjs/common';
import { WorkExperienceService } from './work-experience.service';
import { WorkExperienceController } from './work-experience.controller';
import { WorkExperienceRespository } from '../../repositories/work-experience/work-experience.repository';

@Module({
  controllers: [WorkExperienceController],
  providers: [WorkExperienceService, WorkExperienceRespository],
})
export class WorkExperienceModule {}
