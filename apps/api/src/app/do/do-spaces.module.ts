import { Module } from '@nestjs/common';
import { DoSpacesController } from './do-spaces.controller';
import { DoSpacesService } from './do-spaces.service';
import { DoSpacesServicerovider } from './../../config/do-spaces.config';

@Module({
  controllers: [DoSpacesController],
  // provide both the service and the custom provider
  providers: [DoSpacesServicerovider, DoSpacesService],
})
export class DoSpacesModule {}
