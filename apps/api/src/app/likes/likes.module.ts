import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { LikeRespository } from '../../repositories/likes/likes.repository';

@Module({
  controllers: [LikesController],
  providers: [LikesService, LikeRespository],
})
export class LikesModule {}
