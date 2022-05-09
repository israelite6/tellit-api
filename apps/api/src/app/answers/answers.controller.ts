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
import { Public } from '../../decorators/public.decorator';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller({ version: '1', path: 'answers' })
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  create(@Body() createAnswerDto: CreateAnswerDto, @Request() req: any) {
    const userId = req.user.userId;
    return this.answersService.create({ ...createAnswerDto, userId });
  }

  @Public()
  @Get()
  findAll(@Query() { page, questionId }: { page: string; questionId: string }) {
    return this.answersService.findAll({
      page: +page,
      ...(questionId ? { questionId: +questionId } : {}),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answersService.update(+id, updateAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answersService.remove(+id);
  }
}
