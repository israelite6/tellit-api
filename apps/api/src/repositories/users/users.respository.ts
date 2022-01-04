import { PrismaService } from '../../services/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersRespository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    try {
      return await this.prismaService.user.create({ data });
    } catch (e) {
      const [target] = e.meta.target;
      if (e.code === 'P2002' && target === 'email') {
        throw new BadRequestException('Email already exist');
      }
      if (e.code === 'P2002' && target === 'phoneNumber') {
        throw new BadRequestException('Phone number already exist');
      }
      if (e.code === 'P2002' && target === 'username') {
        throw new BadRequestException('Username already exist');
      }
      throw new BadRequestException(e.message);
    }
  }

  async getOneByEmailOrUsernameOrPhoneNumber(
    email: string,
  ): Promise<Partial<User>> {
    const user = await this.prismaService.user.findFirst({
      where: { OR: [{ email }, { username: email }, { phoneNumber: email }] },
      select: {
        email: true,
        phoneNumber: true,
        firstName: true,
        lastName: true,
        password: true,
        middleName: true,
        username: true,
        id: true,
      },
    });

    return user;
  }
}
