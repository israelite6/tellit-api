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
import { WorkExperienceService } from './work-experience.service';
import { CreateWorkExperienceDto } from './dto/create-work-experience.dto';
import { UpdateWorkExperienceDto } from './dto/update-work-experience.dto';
import { IUpdateWorkExperienceProps } from './work-experience.interface';

@Controller({ path: 'work-experience', version: '1' })
export class WorkExperienceController {
  constructor(private readonly workExperienceService: WorkExperienceService) {}

  @Post()
  create(
    @Body() createWorkExperienceDto: CreateWorkExperienceDto,
    @Request() req: any,
  ) {
    const userId = req.user.userId as string;
    return this.workExperienceService.create({
      ...createWorkExperienceDto,
      userId,
    });
  }

  @Get()
  findAll(@Request() req: any) {
    const userId = req.user.userId as string;
    return this.workExperienceService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workExperienceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkExperienceDto: IUpdateWorkExperienceProps,
  ) {
    return this.workExperienceService.update(id, updateWorkExperienceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workExperienceService.remove(id);
  }
}
