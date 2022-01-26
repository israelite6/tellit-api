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
import { TopicCommentsService } from './topic-comments.service';
import { CreateTopicCommentDto } from './dto/create-topic-comment.dto';
import { UpdateTopicCommentDto } from './dto/update-topic-comment.dto';
import { Public } from '../../decorators/public.decorator';

@Controller({ version: '1', path: 'topics' })
export class TopicCommentsController {
  constructor(private readonly topicCommentsService: TopicCommentsService) {}

  @Post('/:topicId/comments')
  create(
    @Body() createTopicCommentDto: CreateTopicCommentDto,
    @Request() req: any,
    @Param('topicId') topicId: number,
  ) {
    const userId = req.user.userId as string;
    return this.topicCommentsService.create({
      ...createTopicCommentDto,
      userId,
      topicId,
    });
  }

  @Public()
  @Get('/:topicId/comments')
  findAll(@Param('topicId') topicId: number, @Query() query: any) {
    return this.topicCommentsService.findAll({
      topicId,
      page: query.page,
      topicCommentId: query.topicCommentId,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicCommentsService.findOne(+id);
  }

  @Patch('/comments/:id')
  update(
    @Param('id') id: string,
    @Body() updateTopicCommentDto: UpdateTopicCommentDto,
  ) {
    return this.topicCommentsService.update(id, updateTopicCommentDto);
  }

  @Delete('/comments/:id')
  remove(@Param('id') id: string) {
    return this.topicCommentsService.remove(id);
  }
}
