import { Module } from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { SpacesController } from './spaces.controller';
import { SpacesRespository } from '../../repositories/spaces/spaces.repository';

@Module({
  controllers: [SpacesController],
  providers: [SpacesService, SpacesRespository],
})
export class SpacesModule {}
