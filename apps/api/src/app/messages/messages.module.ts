import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { UsersModule } from '../users/users.module';
import { MessagesRepository } from '../../repositories/messages/messages.repository';
import { UserMessagesRepository } from '../../repositories/user_messages/user_messages.repository';

@Module({
  imports: [UsersModule],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepository, UserMessagesRepository],
})
export class MessagesModule {}
