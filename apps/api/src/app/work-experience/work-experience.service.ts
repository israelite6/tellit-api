import { Injectable } from '@nestjs/common';
import { CreateWorkExperienceDto } from './dto/create-work-experience.dto';
import { UpdateWorkExperienceDto } from './dto/update-work-experience.dto';

@Injectable()
export class WorkExperienceService {
  create(createWorkExperienceDto: CreateWorkExperienceDto) {
    return 'This action adds a new workExperience';
  }

  findAll() {
    return `This action returns all workExperience`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workExperience`;
  }

  update(id: number, updateWorkExperienceDto: UpdateWorkExperienceDto) {
    return `This action updates a #${id} workExperience`;
  }

  remove(id: number) {
    return `This action removes a #${id} workExperience`;
  }
}
