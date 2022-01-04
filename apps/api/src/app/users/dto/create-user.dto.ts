import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Prisma } from '@prisma/client';

export class CreateUserDto {
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

  @IsEmail()
  @Length(5, 40)
  email: string;

  @IsString()
  @Length(4, 40)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 40)
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 40)
  username: string;

  public User(): Prisma.UserCreateInput {
    const data = {
      firstName: this.firstName,
      lastName: this.lastName,
      middleName: this.middleName,
      email: this.email,
      password: this.password,
      phoneNumber: this.phoneNumber,
      username: this.username,
    } as unknown as Prisma.UserCreateInput;
    return data;
  }
}
