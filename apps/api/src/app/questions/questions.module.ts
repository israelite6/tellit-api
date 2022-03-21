import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { QuestionsRespository } from '../../repositories/questions/questions.repository';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService, QuestionsRespository],
})
export class QuestionsModule {}
