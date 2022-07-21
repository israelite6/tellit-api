import { Injectable } from '@nestjs/common';
import { MessagesRepository } from '../../repositories/messages/messages.repository';
import { UserMessagesRepository } from '../../repositories/user_messages/user_messages.repository';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ICreateMessage, IFindMessage } from './messages.interface';

@Injectable()
export class MessagesService {
  constructor(
    private readonly messageRepository: MessagesRepository,
    private readonly userMessageRepository: UserMessagesRepository,
  ) {}
  async create(createMessageDto: ICreateMessage) {
    const { fromUserId, toUserId } = createMessageDto;
    const ifExist = await this.userMessageRepository.findMessageConnection({
      fromUserId,
      toUserId,
    });

    console.log(ifExist);

    if (!ifExist) {
      this.userMessageRepository.create({ toUserId, fromUserId });
    }
    return this.messageRepository.create(createMessageDto);
  }

  findAll(findMessageDto: IFindMessage) {
    return this.messageRepository.findMany(findMessageDto);
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
