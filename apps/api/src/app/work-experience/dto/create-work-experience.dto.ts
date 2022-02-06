import { IsBoolean, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkExperienceDto {
  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsDateString()
  @IsNotEmpty()
  startAt: string;

  @IsDateString()
  endAt: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsBoolean()
  isCurrent: boolean;
}
