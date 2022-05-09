import { ForumsRespository } from './../../repositories/forums/forums.repository';
import { Injectable } from '@nestjs/common';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';

@Injectable()
export class ForumsService {
  constructor(private forumsRepository: ForumsRespository) {}

  create(createForumDto: CreateForumDto) {
    return this.forumsRepository.create(createForumDto);
  }

  findAll() {
    return this.forumsRepository.findMany();
  }

  findTrending() {
    return this.forumsRepository.findMany();
  }

  findOne(id: number) {
    return this.forumsRepository.findOneById(id);
  }

  update(id: number, updateForumDto: UpdateForumDto) {
    return this.forumsRepository.updateById({ id, data: updateForumDto });
  }

  remove(id: number) {
    return this.forumsRepository.removeById(id);
  }
}
