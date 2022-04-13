import { Injectable } from '@nestjs/common';
import { SpacesRespository } from '../../repositories/spaces/spaces.repository';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';

@Injectable()
export class SpacesService {
  constructor(private readonly spacesRepository: SpacesRespository) {}

  create(createSpaceDto: CreateSpaceDto) {
    return 'This action adds a new space';
  }

  findAll() {
    return this.spacesRepository.findMany();
  }

  findOne(id: number) {
    return this.spacesRepository.findOneById(id);
  }

  update(id: number, updateSpaceDto: UpdateSpaceDto) {
    return `This action updates a #${id} space`;
  }

  remove(id: number) {
    return `This action removes a #${id} space`;
  }
}
