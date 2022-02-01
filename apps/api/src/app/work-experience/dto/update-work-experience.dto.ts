import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkExperienceDto } from './create-work-experience.dto';

export class UpdateWorkExperienceDto extends PartialType(
  CreateWorkExperienceDto,
) {}
