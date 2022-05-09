import { FcmRespository } from './../../repositories/fcm/fcm.repository';
import { Injectable } from '@nestjs/common';
import { CreateFcmDto } from './dto/create-fcm.dto';
import { UpdateFcmDto } from './dto/update-fcm.dto';
import { ICreateFcmProps } from './fcm.interface';

@Injectable()
export class FcmService {
  constructor(private fcmRepository: FcmRespository) {}

  create(createFcmDto: ICreateFcmProps) {
    return this.fcmRepository.create(createFcmDto);
  }

  findAll() {
    return `This action returns all fcm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fcm`;
  }

  update(id: number, updateFcmDto: UpdateFcmDto) {
    return `This action updates a #${id} fcm`;
  }

  remove(id: number) {
    return `This action removes a #${id} fcm`;
  }
}
