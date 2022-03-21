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
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Public } from '../../decorators/public.decorator';
import {
  IGetQuestionsQuery,
  IGetRelatedQuestionsQuery,
} from './question.interface';

@Controller({ version: '1', path: 'questions' })
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto, @Request() req: any) {
    const userId = req.user.userId;

    return this.questionsService.create({ ...createQuestionDto, userId });
  }

  @Public()
  @Get()
  findAll(@Query() { page, spaceId }: IGetQuestionsQuery) {
    console.log({ page, spaceId });
    return this.questionsService.findAll({ page: +page, spaceId: +spaceId });
  }

  @Public()
  @Get('/related')
  findAllRelated(@Query() { spaceId }: IGetRelatedQuestionsQuery) {
    return this.questionsService.findAllRelated({ spaceId: +spaceId });
  }

  @Public()
  @Get(':id/id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }

  @Post(':id/follow')
  follow(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.userId;

    return this.questionsService.follow({ userId, id: +id });
  }

  @Delete(':id/follow')
  unfollow(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.userId;

    return this.questionsService.unfollow({ userId, id: +id });
  }
}
