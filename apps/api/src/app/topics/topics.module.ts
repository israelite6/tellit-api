import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { TopicsRespository } from '../../repositories/topics/topics.repository';

@Module({
  controllers: [TopicsController],
  providers: [TopicsService, TopicsRespository],
})
export class TopicsModule {}
