import { IsNotEmpty, IsString, IsBoolean, IsDateString } from 'class-validator';

export class CreateEducationHistoryDto {
  @IsString()
  @IsNotEmpty()
  degree: string;

  @IsString()
  @IsNotEmpty()
  course: string;

  @IsString()
  @IsNotEmpty()
  schoolName: string;

  @IsBoolean()
  isCurrent: boolean;

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
}
