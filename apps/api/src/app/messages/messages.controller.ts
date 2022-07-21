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
import { MessagesService } from './messages.service';
import { CreateMessageDto, FindMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Public } from '../../decorators/public.decorator';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';
import { CreateUserDto } from '../users/dto/create-user.dto';

// @Controller('messages')
@Controller({ version: '1', path: 'messages' })
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  async create(
    @Body() createMessageDto: CreateMessageDto,
    @Request() req: any,
  ) {
    const fromUserId = req.user.userId as string;
    return this.messagesService.create({
      ...createMessageDto,
      fromUserId,
    });
  }

  @Get()
  findAll(@Body() findMessageDto: FindMessageDto, @Request() req: any) {
    const fromUserId = req.user.userId as string;

    return this.messagesService.findAll({ ...findMessageDto, fromUserId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(+id);
  }
}
