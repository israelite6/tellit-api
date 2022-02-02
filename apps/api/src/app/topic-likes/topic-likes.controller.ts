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
import { TopicLikesService } from './topic-likes.service';
import { CreateTopicLikeDto } from './dto/create-topic-like.dto';
import { UpdateTopicLikeDto } from './dto/update-topic-like.dto';

@Controller({ version: '1', path: 'topics' })
export class TopicLikesController {
  constructor(private readonly topicLikesService: TopicLikesService) {}

  @Post(':topicId/likes')
  create(
    @Body() createTopicLikeDto: CreateTopicLikeDto,
    @Request() req: any,
    @Param('topicId') topicId: number,
  ) {
    const userId = req.user.userId;

    return this.topicLikesService.create({
      userId,
      topicId,
      ...createTopicLikeDto,
    });
  }

  @Get(':topicId/likes/counts')
  findAllCount(@Request() req: any, @Param('topicId') topicId: number) {
    const userId = req.user.userId;
    return this.topicLikesService.findAllCount({ userId, topicId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicLikesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTopicLikeDto: UpdateTopicLikeDto,
  ) {
    return this.topicLikesService.update(+id, updateTopicLikeDto);
  }

  @Delete(':topicId/likes')
  remove(
    @Param('topicId') topicId: number,
    @Request() req: any,
    @Body() createTopicLikeDto: CreateTopicLikeDto,
  ) {
    const userId = req.user.userId;
    return this.topicLikesService.remove({
      userId,
      topicId,
      ...createTopicLikeDto,
    });
  }
}
