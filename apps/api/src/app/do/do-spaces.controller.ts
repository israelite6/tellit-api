import {
  Controller,
  UploadedFile,
  UseInterceptors,
  Post,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DoSpacesService } from './do-spaces.service';
import { UploadedMulterFileI } from './../../config/do-spaces.config';

// just a typical nestJs controller
@Controller({ version: '1', path: 'do' })
export class DoSpacesController {
  constructor(private readonly doSpacesService: DoSpacesService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async uploadFile(@UploadedFile() file: UploadedMulterFileI) {
    const url = await this.doSpacesService.uploadFile(file);

    return {
      url,
    };
  }
}
