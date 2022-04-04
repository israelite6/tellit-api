import { Injectable } from '@nestjs/common';
import { PAGINATION_THRESHOLD } from '../../config/constants';
import { AnswersRespository } from '../../repositories/answers/answers.repository';
import { HelperService } from '../../services/helper/helper.service';
import { ICreateAnswerProps, IFindAllAnswerProps } from './answers.interface';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswersService {
  constructor(
    private answersRepository: AnswersRespository,
    private helperService: HelperService,
  ) {}

  create(createAnswerDto: ICreateAnswerProps) {
    return this.answersRepository.create(createAnswerDto);
  }

  async findAll({ page, questionId }: IFindAllAnswerProps) {
    const { answers, total } = await this.answersRepository.findMany({
      ...this.helperService.paginate(page),
      questionId,
    });

    return {
      answers,
      meta: {
        total,
        currentPage: page,
        perPage: PAGINATION_THRESHOLD,
        numberOfPages: Math.ceil(total / PAGINATION_THRESHOLD),
      },
    };
    return 'This action returns all answers';
  }

  findOne(id: number) {
    return `This action returns a #${id} answer`;
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
