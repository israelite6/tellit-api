import { Module } from '@nestjs/common';
import { TopicLikesService } from './topic-likes.service';
import { TopicLikesController } from './topic-likes.controller';
import { TopicLikeRespository } from '../../repositories/topic-likes/topic-likes.repository';

@Module({
  controllers: [TopicLikesController],
  providers: [TopicLikesService, TopicLikeRespository],
})
export class TopicLikesModule {}
