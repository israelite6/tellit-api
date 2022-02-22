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
  findAll(@Query() query: GetTopicDto, @Request() req: any) {
    const userId = req?.user?.userId as string;
    return this.topicsService.findAll({ userId, ...query });
  }

  @Public()
  @Get('/trending')
  findTrending(@Query() query: GetTopicDto, @Request() req: any) {
    const userId = req?.user?.userId as string;
    return this.topicsService.findTrending({ userId, ...query });
  }

  @Public()
  @Get('/related/:id')
  findRelated(@Param() id: string, @Request() req: any) {
    const userId = req?.user?.userId as string;
    return this.topicsService.findRelated({ userId, id: +id });
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    const userId = req?.user?.userId as string;
    console.log(req.user);
    return this.topicsService.findOne(+id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    return this.topicsService.update(+id, updateTopicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicsService.remove(+id);
  }

  @Public()
  @Patch('/views/:id')
  async views(@Param('id') id: string) {
    return this.topicsService.views(+id);
  }

  @Public()
  @Patch('/share/:id')
  async share(@Param('id') id: string) {
    return this.topicsService.share(+id);
  }
}
