import { Injectable } from '@nestjs/common';
import { CreateFcmDto } from './dto/create-fcm.dto';
import { UpdateFcmDto } from './dto/update-fcm.dto';

@Injectable()
export class FcmService {
  create(createFcmDto: CreateFcmDto) {
    return 'This action adds a new fcm';
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
