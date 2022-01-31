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
import { EducationHistoriesService } from './education-histories.service';
import { CreateEducationHistoryDto } from './dto/create-education-history.dto';
import { UpdateEducationHistoryDto } from './dto/update-education-history.dto';

@Controller({ version: '1', path: 'education-histories' })
export class EducationHistoriesController {
  constructor(
    private readonly educationHistoriesService: EducationHistoriesService,
  ) {}

  @Post()
  create(
    @Body() createEducationHistoryDto: CreateEducationHistoryDto,
    @Request() req: any,
  ) {
    const userId = req.user.userId as string;
    return this.educationHistoriesService.create({
      ...createEducationHistoryDto,
      userId,
    });
  }

  @Get()
  findAll(@Request() req: any) {
    const userId = req.user.id as string;
    return this.educationHistoriesService.findAll({ userId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.educationHistoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEducationHistoryDto: UpdateEducationHistoryDto,
  ) {
    return this.educationHistoriesService.update(id, updateEducationHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educationHistoriesService.remove(id);
  }
}
