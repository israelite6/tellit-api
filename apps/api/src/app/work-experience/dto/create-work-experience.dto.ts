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

  @IsString()
  @IsNotEmpty()
  startMonth: string;

  @IsString()
  @IsNotEmpty()
  startYear: string;

  @IsString()
  endMonth: string;

  @IsString()
  endYear: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsBoolean()
  isCurrent: boolean;
}
