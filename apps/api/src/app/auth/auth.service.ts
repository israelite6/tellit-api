import { ResetPasswordDto } from './dto/reset-password.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRespository } from '../../repositories/users/users.respository';
import { LoginAuthDto } from './dto/login-auth.dto';
import { HelperService } from '../../services/helper/helper.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRespository,
    private helperService: HelperService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    console.log(loginAuthDto);
    const email = loginAuthDto.email;
    const user =
      await this.usersRepository.getOneByEmailOrUsernameOrPhoneNumber(email);
    if (!user) {
      throw new BadRequestException('Invalid login credentials');
    }
    const isPasswordMatch = await this.helperService.hashMatches({
      hash: user.password,
      plainText: loginAuthDto.password,
    });
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid login credentials');
    }
    return this.helperService.signJwt(user);
  }

  async forgetPassword(email: string): Promise<Partial<User>> {
    const user =
      await this.usersRepository.getOneByEmailOrUsernameOrPhoneNumber(email);
    if (!user) {
      throw new BadRequestException('Invalid email address');
    }

    const forgetPasswordToken =
      this.helperService.generateForgetPasswordToken();

    const forgetPasswordTokenExpiration =
      this.helperService.getForgetPasswordTokenExpiration();

    const update = await this.usersRepository.updateForgetPasswordTokenByUserId(
      {
        id: user.id,
        forgetPasswordToken,
        forgetPasswordTokenExpiration,
      },
    );

    await this.helperService.sendEmail({
      to: user.email,
      subject: 'Forget password ',
      html: forgetPasswordToken,
      title: 'Forget password',
    });

    return update;
  }

  async resetPassword(data: ResetPasswordDto) {
    const user = await this.usersRepository.getOneByForgetPasswordToken(
      data.forgetPasswordToken,
    );
    if (!user) {
      throw new BadRequestException('Invalid or expired token');
    }

    const hashPassword = await this.helperService.hash(data.password);
    this.usersRepository.updatePasswordByUserId({
      id: user.id,
      password: hashPassword,
      forgetPasswordToken: null,
      forgetPasswordTokenExpiration: null,
    });
  }
}
