import { IFindManyEducationHistoryProps } from './../../repositories/education-histories/education-histories.repository.interface';
import { Injectable } from '@nestjs/common';
import { ICreateEducationHistoryProps } from './education-history.interface';
import { CreateEducationHistoryDto } from './dto/create-education-history.dto';
import { UpdateEducationHistoryDto } from './dto/update-education-history.dto';
import { HelperService } from '../../services/helper/helper.service';
import { EducationHistoriesRespository } from '../../repositories/education-histories/education-histories.repository';

@Injectable()
export class EducationHistoriesService {
  constructor(
    private educationHistoryRepository: EducationHistoriesRespository,
    private helperService: HelperService,
  ) {}

  create(data: ICreateEducationHistoryProps) {
    return this.educationHistoryRepository.create(data);
  }

  findAll(data: IFindManyEducationHistoryProps) {
    return this.educationHistoryRepository.findMany(data.userId);
  }

  findOne(id: number) {
    return `This action returns a #${id} educationHistory`;
  }

  update(id: string, updateEducationHistoryDto: UpdateEducationHistoryDto) {
    return this.educationHistoryRepository.updateById({
      id,
      data: updateEducationHistoryDto,
    });
  }

  remove(id: string) {
    return this.educationHistoryRepository.removeById(id);
    return `This action removes a #${id} educationHistory`;
  }
}
