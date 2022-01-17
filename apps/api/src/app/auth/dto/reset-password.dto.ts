import { IsNotEmpty, Length, IsString, Matches } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @Length(4, 4)
  forgetPasswordToken: string;

  @IsString()
  @Length(4, 40)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
