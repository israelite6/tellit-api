import { Module } from '@nestjs/common';
import { TopicCommentsService } from './topic-comments.service';
import { TopicCommentsController } from './topic-comments.controller';
import { TopicCommentsRespository } from '../../repositories/topics-comments/topics-comments.repository';

@Module({
  controllers: [TopicCommentsController],
  providers: [TopicCommentsService, TopicCommentsRespository],
})
export class TopicCommentsModule {}
