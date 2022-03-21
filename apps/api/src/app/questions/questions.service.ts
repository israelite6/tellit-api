import { Injectable } from '@nestjs/common';
import { PAGINATION_THRESHOLD } from '../../config/constants';
import { QuestionsRespository } from '../../repositories/questions/questions.repository';
import { HelperService } from '../../services/helper/helper.service';
import { UpdateQuestionDto } from './dto/update-question.dto';
import {
  ICreateQuestionProp,
  IGetQuestionsProps,
  IGetRelatedQuestionsProps,
} from './question.interface';

@Injectable()
export class QuestionsService {
  constructor(
    private questionsRepository: QuestionsRespository,
    private helper: HelperService,
  ) {}

  create(createQuestionDto: ICreateQuestionProp) {
    return this.questionsRepository.create(createQuestionDto);
  }

  async findAll({ page, spaceId }: IGetQuestionsProps) {
    const { questions, total } = await this.questionsRepository.findMany({
      ...this.helper.paginate(page),
      ...(spaceId ? { spaceId } : {}),
    });

    return {
      questions,
      meta: {
        total,
        currentPage: page,
        perPage: PAGINATION_THRESHOLD,
        numberOfPages: Math.ceil(total / PAGINATION_THRESHOLD),
      },
    };
  }

  findAllRelated({ spaceId }: IGetRelatedQuestionsProps) {
    return this.questionsRepository.findManyRelated({
      spaceId,
    });
  }

  findOne(id: number) {
    return this.questionsRepository.findOneById(id);
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return this.questionsRepository.updateById({ id, data: updateQuestionDto });
  }

  remove(id: number) {
    return this.questionsRepository.removeById(id);
  }
}
