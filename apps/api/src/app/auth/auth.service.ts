import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersRespository } from '../../repositories/users/users.respository';
import { LoginAuthDto } from './dto/login-auth.dto';
import { HelperService } from '../../services/helper/helper.service';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRespository,
    private helperService: HelperService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
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

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
