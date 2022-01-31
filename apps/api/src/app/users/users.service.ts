import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRespository } from '../../repositories/users/users.respository';
import { HelperService } from '../../services/helper/helper.service';
import { User } from '@prisma/client';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import {
  SEND_EMAIL_QUEUE_NAME,
  SIGNUP_EMAIL_JOB,
} from '../../config/constants';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRespository,
    private helperService: HelperService,
    @InjectQueue(SEND_EMAIL_QUEUE_NAME) private signupEmailQueue: Queue,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const data = createUserDto.User();
    data.password = await this.helperService.hash(data.password);
    const user = (await this.usersRepository.create(data)) as Partial<User>;
    const test = await this.signupEmailQueue.add(SIGNUP_EMAIL_JOB, {
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
    });
    return this.helperService.signJwt(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.updateById(id, updateUserDto);
  }

  remove(userId: string) {
    return this.usersRepository.getOneByUserId(userId);
  }
}
