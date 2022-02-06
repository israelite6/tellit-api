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

  @IsDateString()
  @IsNotEmpty()
  startAt: string;

  @IsDateString()
  endAt: string;
}
