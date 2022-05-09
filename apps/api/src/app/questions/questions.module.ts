import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { QuestionsRespository } from '../../repositories/questions/questions.repository';
import { FollowQuestionRespository } from '../../repositories/follow-question/follow-question.repository';

@Module({
  controllers: [QuestionsController],
  providers: [
    QuestionsService,
    QuestionsRespository,
    FollowQuestionRespository,
  ],
})
export class QuestionsModule {}
