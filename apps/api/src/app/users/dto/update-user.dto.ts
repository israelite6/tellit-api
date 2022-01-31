import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  gender: string;

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
}
