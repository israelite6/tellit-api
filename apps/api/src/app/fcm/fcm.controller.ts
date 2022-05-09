import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { FcmService } from './fcm.service';
import { CreateFcmDto } from './dto/create-fcm.dto';
import { UpdateFcmDto } from './dto/update-fcm.dto';

@Controller({ version: '1', path: 'fcm' })
export class FcmController {
  constructor(private readonly fcmService: FcmService) {}

  @Post()
  create(@Body() createFcmDto: CreateFcmDto, @Request() req: any) {
    const userId = req.user.userId;
    return this.fcmService.create({ ...createFcmDto, userId });
  }

  @Get()
  findAll() {
    return this.fcmService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fcmService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFcmDto: UpdateFcmDto) {
    return this.fcmService.update(+id, updateFcmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fcmService.remove(+id);
  }
}
