import { Injectable } from '@nestjs/common';
import { WorkExperienceRespository } from '../../repositories/work-experience/work-experience.repository';
import { CreateWorkExperienceDto } from './dto/create-work-experience.dto';
import { UpdateWorkExperienceDto } from './dto/update-work-experience.dto';
import {
  ICreateWorkExperienceProps,
  IUpdateWorkExperienceProps,
} from './work-experience.interface';

@Injectable()
export class WorkExperienceService {
  constructor(private workExperienceRepository: WorkExperienceRespository) {}

  create(createWorkExperienceDto: ICreateWorkExperienceProps) {
    return this.workExperienceRepository.create(createWorkExperienceDto);
  }

  findAll(userId: string) {
    return this.workExperienceRepository.findMany(userId);
  }

  findOne(id: number) {
    return `This action returns a #${id} workExperience`;
  }

  update(id: string, updateWorkExperienceDto: IUpdateWorkExperienceProps) {
    return this.workExperienceRepository.updateById(
      id,
      updateWorkExperienceDto,
    );
  }

  remove(id: string) {
    return this.workExperienceRepository.removeById(id);
  }
}
