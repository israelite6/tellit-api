import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FcmService } from './fcm.service';
import { CreateFcmDto } from './dto/create-fcm.dto';
import { UpdateFcmDto } from './dto/update-fcm.dto';

@Controller('fcm')
export class FcmController {
  constructor(private readonly fcmService: FcmService) {}

  @Post()
  create(@Body() createFcmDto: CreateFcmDto) {
    return this.fcmService.create(createFcmDto);
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
