import { ForumsRespository } from './../../repositories/forums/forums.repository';
import { Module } from '@nestjs/common';
import { ForumsService } from './forums.service';
import { ForumsController } from './forums.controller';

@Module({
  controllers: [ForumsController],
  providers: [ForumsService, ForumsRespository],
})
export class ForumsModule {}
