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
import { ECommentType } from '@prisma/client';

@Controller({ version: '1', path: '/comments' })
export class TopicCommentsController {
  constructor(private readonly topicCommentsService: TopicCommentsService) {}

  @Post('topics/:topicId')
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
      type: ECommentType.TOPIC,
    });
  }

  @Public()
  @Get('topics/:topicId')
  findAll(
    @Param('topicId') topicId: number,
    @Query() query: any,
    @Request() req: any,
  ) {
    const userId = req?.user?.userId as string;
    return this.topicCommentsService.findAll({
      topicId,
      page: query.page,
      topicCommentId: query.topicCommentId,
      userId,
      type: ECommentType.TOPIC,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicCommentsService.findOne(+id);
  }

  @Patch('topics/:id')
  update(
    @Param('id') id: string,
    @Body() updateTopicCommentDto: UpdateTopicCommentDto,
  ) {
    return this.topicCommentsService.update(id, updateTopicCommentDto);
  }

  @Patch('/:id')
  updateAnyComment(
    @Param('id') id: string,
    @Body() updateTopicCommentDto: UpdateTopicCommentDto,
  ) {
    return this.topicCommentsService.update(id, updateTopicCommentDto);
  }

  @Delete('/:id')
  removeAnyComment(@Param('id') id: string) {
    return this.topicCommentsService.remove(id);
  }

  @Delete('/comments/:id')
  remove(@Param('id') id: string) {
    return this.topicCommentsService.remove(id);
  }

  @Post('answers/:answerId')
  createAnswers(
    @Body() createTopicCommentDto: CreateTopicCommentDto,
    @Request() req: any,
    @Param('answerId') answerId: string,
  ) {
    const userId = req.user.userId as string;
    return this.topicCommentsService.create({
      ...createTopicCommentDto,
      userId,
      answerId,
      type: ECommentType.ANSWER,
    });
  }

  @Public()
  @Get('answers/:answerId')
  findAllAnswers(
    @Param('answerId') answerId: string,
    @Query() query: any,
    @Request() req: any,
  ) {
    const userId = req?.user?.userId as string;
    return this.topicCommentsService.findAll({
      answerId,
      page: query.page,
      topicCommentId: query.topicCommentId,
      userId,
      type: ECommentType.ANSWER,
    });
  }
}
