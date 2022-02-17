import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  CreateUserResponseInterface,
  IFindMentionDto,
} from './users.interface';
import { Public } from '../../decorators/public.decorator';

@Controller({ version: '1', path: 'users' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseInterface> {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/profile')
  remove(@Request() req) {
    console.log(req.user);
    return this.usersService.remove(req.user.userId);
  }

  @Get('/mentioned')
  findMention(@Query() { search, isPaginated, page }: IFindMentionDto) {
    return this.usersService.findUserForMention({
      search,
      isPaginated: isPaginated === 'true' ? true : false,
      page: +page,
    });
  }

  @Public()
  @Get(':id/id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch()
  update(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.userId as string;
    return this.usersService.update(userId, updateUserDto);
  }
}
