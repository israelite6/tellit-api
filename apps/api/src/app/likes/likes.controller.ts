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
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { ELikeCategory } from '@prisma/client';
import { Public } from '../../decorators/public.decorator';

@Controller({ version: '1', path: 'likes' })
export class LikesController {
  constructor(private readonly topicLikesService: LikesService) {}

  @Post(':topicId/topics')
  createTopic(
    @Body() createLikeDto: CreateLikeDto,
    @Request() req: any,
    @Param('topicId') topicId: number,
  ) {
    const userId = req.user.userId;

    return this.topicLikesService.create({
      userId,
      topicId,
      ...createLikeDto,
      category: ELikeCategory.TOPIC,
    });
  }

  @Get(':topicId/topics/counts')
  findAllTopicCount(@Request() req: any, @Param('topicId') topicId: number) {
    return this.topicLikesService.findAllCount({
      topicId,
      category: ELikeCategory.TOPIC,
    });
  }

  @Post(':topicCommentId/topic-comments')
  createTopicComment(
    @Body() createLikeDto: CreateLikeDto,
    @Request() req: any,
    @Param('topicCommentId') topicCommentId: string,
  ) {
    const userId = req.user.userId;
    console.log(topicCommentId);

    return this.topicLikesService.create({
      userId,
      topicCommentId,
      ...createLikeDto,
      category: ELikeCategory.TOPIC_COMMENT,
    });
  }

  @Get(':topicCommentId/topic-comments/counts')
  findAllTopicCommentCount(
    @Request() req: any,
    @Param('topicCommentId') topicCommentId: string,
  ) {
    return this.topicLikesService.findAllCount({
      topicCommentId,
      category: ELikeCategory.TOPIC_COMMENT,
    });
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.topicLikesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
  //   return this.topicLikesService.update(+id, updateLikeDto);
  // }

  @Delete(':topicId/topics')
  removeTopic(
    @Param('topicId') topicId: number,
    @Request() req: any,
    @Body() createLikeDto: CreateLikeDto,
  ) {
    const userId = req.user.userId;
    return this.topicLikesService.remove({
      userId,
      topicId,
      ...createLikeDto,
      category: ELikeCategory.TOPIC,
    });
  }

  @Delete(':topicCommentId/topic-comments')
  removeTopicComment(
    @Param('topicCommentId') topicCommentId: string,
    @Request() req: any,
    @Body() createLikeDto: CreateLikeDto,
  ) {
    const userId = req.user.userId;
    return this.topicLikesService.remove({
      userId,
      topicCommentId,
      ...createLikeDto,
      category: ELikeCategory.TOPIC_COMMENT,
    });
  }

  @Public()
  @Post('likee')
  likee(@Body() body: any) {
    console.log(body);
  }

  @Post(':answerId/answers')
  createAnswer(
    @Body() createLikeDto: CreateLikeDto,
    @Request() req: any,
    @Param('topicId') topicId: number,
  ) {
    const userId = req.user.userId;

    return this.topicLikesService.create({
      userId,
      topicId,
      ...createLikeDto,
      category: ELikeCategory.TOPIC,
    });
  }
}
