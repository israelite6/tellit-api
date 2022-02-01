import { CreateWorkExperienceDto } from './dto/create-work-experience.dto';

export interface ICreateWorkExperienceProps extends CreateWorkExperienceDto {
  userId: string;
}

export interface IUpdateWorkExperienceProps
  extends Partial<CreateWorkExperienceDto> {
  userId?: string;
}
