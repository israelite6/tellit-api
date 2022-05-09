import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { AnswersRespository } from '../../repositories/answers/answers.repository';

@Module({
  controllers: [AnswersController],
  providers: [AnswersService, AnswersRespository],
})
export class AnswersModule {}
