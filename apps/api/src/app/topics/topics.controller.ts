import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Public } from '../../decorators/public.decorator';
import { GetTopicDto } from './dto/get-topic.dto';

@Controller({ version: '1', path: 'topics' })
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  async create(@Body() createTopicDto: CreateTopicDto, @Request() req: any) {
    const userId = req.user.userId as string;
    const topic = await this.topicsService.create({
      ...createTopicDto,
      userId,
    });
    return { description: 'Saved successfully' };
  }

  @Public()
  @Get()
  findAll(@Query() query: GetTopicDto) {
    return this.topicsService.findAll(query);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    return this.topicsService.update(+id, updateTopicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicsService.remove(+id);
  }
}
