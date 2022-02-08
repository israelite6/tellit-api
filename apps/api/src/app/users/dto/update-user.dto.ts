import { EGender } from './../../../config/constants';
import { IsEnum, IsIn, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsEnum(EGender)
  gender: EGender;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;

  @Length(2, 20)
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Length(2, 20)
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Length(2, 20)
  @IsString()
  middleName: string;

  @IsString()
  photoUrl: string;
}
