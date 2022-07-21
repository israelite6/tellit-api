import { User } from '@prisma/client';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateMessageDto, FindMessageDto } from './dto/create-message.dto';

export interface ICreateMessage extends CreateMessageDto {
  fromUserId: string;
}

export interface IFindMessage extends FindMessageDto {
  fromUserId: string;
  toUserId: string;
}
